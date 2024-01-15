<?php

namespace PromCMS\Modules\Adcards\Controllers;

use DI\Container;
use League\Flysystem\Filesystem;
use Monolog\Logger;
use Opis\JsonSchema\Errors\ErrorFormatter;
use Opis\JsonSchema\Errors\ValidationError;
use Opis\JsonSchema\Validator;
use PromCMS\Core\Config;
use PromCMS\Core\Mailer;
use PromCMS\Core\Models\Files;
use PromCMS\Core\Services\EntryTypeService;
use PromCMS\Core\Services\LocalizationService;
use PromCMS\Core\Services\RenderingService;
use PromCMS\Core\Utils\FsUtils;
use PromCMS\Modules\Adcards\Cart;
use PromCMS\Modules\Adcards\OrderStatus;
use PromCMS\Modules\Adcards\StaticMessages;
use PromCMS\Modules\Adcards\UUID;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Middleware\Session;

class CartController
{

    private static $errorMessagesForRequiredFields = [
        "*" => 'Toto políčko je povinné',
        "shippingMetadata" => "Dokončete výběr",
    ];
    private Container $container;
    private string $validationSchema;
    private Validator $validationSchemaValidator;
    private Logger $logger;

    private function getRandomFileName($extension)
    {
        $newBasename = bin2hex(random_bytes(8)) . '-' . time();

        return sprintf('%s.%0.8s', $newBasename, $extension);
    }

    private function getValidationSchema(): string
    {
        $parsedSchema = json_decode(FsUtils::readFile("@modules:Adcards/schemas/order.schema.json"));

        $parsedSchema->properties->paymentMethod->enum = array_keys(Cart::$availablePaymentMethods);
        $parsedSchema->properties->shippingMethod->enum = array_keys(Cart::$availableShipping);

        return json_encode($parsedSchema);
    }

    public function __construct(Container $container)
    {
        $this->container = $container;
        $this->validationSchema = $this->getValidationSchema();
        $this->logger = $this->container->get(Logger::class);
        $validator = new Validator();
        $validator->setMaxErrors(20);
        $validator->resolver()->registerRaw($this->validationSchema, "checkout-validation");
        $this->validationSchemaValidator = $validator;
    }

    public function get(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $cart = $this->container->get(Cart::class);

        return $this
            ->container
            ->get(RenderingService::class)
            ->render(
                $response,
                '@modules:Adcards/pages/kosik.twig',
                array_merge($cart->stateToTemplateVariables(), [
                    "validationSchema" => $this->validationSchema,
                    "shippingMethods" => Cart::$availableShipping,
                    "errorMessagesForRequiredFields" => self::$errorMessagesForRequiredFields
                ])
            );
    }

    public function doCheckout_API(ServerRequestInterface $request, ResponseInterface $response, $args)
    {
        /**
         * @var $fs Filesystem
         * @var $session Session
         */
        $cart = $this->container->get(Cart::class);
        $fs = $this->container->get("filesystem");

        if (empty($cart->getProducts()) && empty($cart->getCards())) {
            return $response->withStatus(400);
        }

        $rendering = $this->container->get(RenderingService::class);
        $parsedData = $request->getParsedBody();

        // This will be json when incoming so it needs to be parsed
        if (!empty($parsedData["shippingMetadata"])) {
            $parsedData["shippingMetadata"] = (array)json_decode($parsedData["shippingMetadata"]);
        }

        $parsedDataAsObject = (object)$parsedData;
        // Do shipping metadata separately
        if (!empty($parsedDataAsObject->shippingMetadata)) {
            $parsedDataAsObject->shippingMetadata = (object)$parsedDataAsObject->shippingMetadata;
        }
        $validationResult = $this->validationSchemaValidator->validate($parsedDataAsObject, $this->validationSchema);

        if (!$validationResult->isValid()) {
            // TODO - this is consuming a lot of resources (fetching items from database)
            $resultPayload = array_merge($cart->stateToTemplateVariables(), [
                "data" => $parsedData,
                "state" => [
                    "form" => [
                        "errors" => [],
                        "values" => $parsedData
                    ]
                ]
            ]);

            $resultPayload["shippingMethods"] = Cart::$availableShipping;
            $resultPayload["paymentMethods"] = Cart::$availablePaymentMethods;
            $formatter = new ErrorFormatter();
            $missingFields = $formatter->formatFlat(
                $validationResult->error(),
                function (ValidationError $error) use ($formatter) {
                    return array_values($error->args()["missing"]);
                }
            )[0];

            foreach ($missingFields as $missingField) {
                $message = isset(self::$errorMessagesForRequiredFields[$missingField]) ?? self::$errorMessagesForRequiredFields["*"];

                $resultPayload["state"]["form"]["errors"][$missingField] = $message;
            }

            $rendering->render($response,
                "@modules:Adcards/pages/kosik.twig",
                $resultPayload
            );

            return $response->withHeader("HX-Retarget", "#app-cart");
        }

        // Prepare
        $orderUuid = UUID::create();
        $currentLanguage = $this->container->get(LocalizationService::class)->getCurrentLanguage();
        $ordersService = new EntryTypeService(new \Orders());
        $config = $this->container->get(Config::class);
        $userEmailTemplatePayload = [
            "baseUrl" => $config->app->baseUrl,
            "buttonUrl" => $config->app->baseUrl . "/objednavky/$orderUuid",
            "texts" => [
                "preview" => 'Děkujeme za objednávku na adcards.cz!',
                "summary" => "Děkujeme za objednávku na adcards.cz! Objednávku u nás registrujeme a brzy Vás budeme kontaktovat o změně stavu. Mezitím si můžete zkontrolovat Vaši objednávku níže.",
                "showOrder" => "Zobrazit objednávku",
                'orderSummary' => 'Přehled objednávky'
            ],
            'products' => [],
            'cards' => [],
            'shipping' => [
                'label' => 'Doprava',
                'price' => [
                    'label' => 'Cena za dopravu'
                ]
            ],
            'payment' => [
                'label' => 'Platba'
            ],
            'subtotal' => [
                'label' => 'Mezisoučet'
            ],
            'price' => [
                'label' => 'Cena celkem',
            ],
        ];

        // Create order payload
        $orderPayload = new \stdClass();
        $orderPayload->_uuid = $orderUuid;
        $orderPayload->currency = "CZK";
        $orderPayload->firstName = $parsedData["firstname"];
        $orderPayload->lastName = $parsedData["lastname"];
        $orderPayload->email = $parsedData["email"];
        $orderPayload->phone = $parsedData["phone"];
        $orderPayload->street = $parsedData["street"];
        $orderPayload->building_number = $parsedData["houseNumber"];
        $orderPayload->city = $parsedData["city"];
        $orderPayload->postal_code = $parsedData["postalCode"];
        $orderPayload->note = $parsedData["note"];
        $orderPayload->shipping_method = $parsedData["shippingMethod"];
        $orderPayload->shipping_rate = intval(Cart::$availableShipping[$parsedData["shippingMethod"]]["rate"]);
        $orderPayload->payment_method = $parsedData["paymentMethod"];
        // We set every order as unpaid,
        $orderPayload->status = OrderStatus::UNPAID;

        // Process payment
        $userEmailTemplatePayload['payment']['value'] = Cart::$availablePaymentMethods[$orderPayload->payment_method]['title'];

        // parse shipping into readable format, but still leave that parsable
        $shippingMetadata = Cart::$availableShipping[$parsedData["shippingMethod"]];
        $userEmailTemplatePayload['shipping']['value'] = Cart::$availableShipping[$orderPayload->shipping_method]['title'];
        if (!empty($shippingMetadata["metadataRequiredFields"])) {
            $shippingMethodMetadata = implode(
                ", ",
                array_map(
                    fn($metadataFieldName) => $parsedData["shippingMetadata"][$metadataFieldName],
                    $shippingMetadata["metadataRequiredFields"]
                )
            );

            $orderPayload->shipping_method .= "; $shippingMethodMetadata";
            $userEmailTemplatePayload['shipping']['value'] .= "; $shippingMethodMetadata";
        }
        $userEmailTemplatePayload['shipping']['price']['value'] = "$orderPayload->shipping_rate Kč";

        // Process price
        $subtotal = $cart->getTotal(true);
        $orderPayload->total_cost = $subtotal + $orderPayload->shipping_rate;
        $orderPayload->currency = "CZK";

        $userEmailTemplatePayload['subtotal']['value'] = "$subtotal Kč";
        $userEmailTemplatePayload['price']['value'] = "$orderPayload->total_cost Kč";

        // Process promo code
        if ($promoCode = $cart->getPromoCode()) {
            $orderPayload->promo_code_value = $promoCode["code"];
            $orderPayload->promo_code_amount = intval($promoCode["amount"]);

            $userEmailTemplatePayload['subtotal']['value'] = "<s>" . $cart->getTotal(false) . " Kč</s>" . $subtotal . " Kč";
        }

        // Process cards
        $createdCards = [];
        $cardsInCart = $cart->getCards();
        if (!empty($cardsInCart)) {
            $cardsService = new EntryTypeService(new \Cards());
            $orderPayload->cards = ["data" => []];

            foreach ($cardsInCart as $cardIndex => $cardInCart) {
                $cardPayload = new \stdClass();
                $cardInCartAsArray = $cardInCart->asArray();

                $cardPayload->name = $cardInCartAsArray["name"];
                $cardPayload->background_id = intval($cardInCartAsArray["background_id"]);
                $cardPayload->size_id = intval($cardInCart->getSizeId());
                $cardPayload->card_type = $cardInCartAsArray["cardType"];
                $cardPayload->final_price = $cardInCart->getPrice();
                $cardPayload->bonuses = ['data' => []];

                $size = (new \CardSizes())
                    ->query()
                    ->setLanguage($currentLanguage)
                    ->join(function ($size) use ($currentLanguage) {
                        return (new \CardMaterial())->query()
                            ->setLanguage($currentLanguage)
                            ->getOneById(intval($size["material_id"]))
                            ->getData();
                    }, 'material')
                    ->select(['material'])
                    ->getOneById($cardPayload->size_id)
                    ->getData();
                $sizeMaterialBonuses = $size['material']['bonuses']['data'] ?? [];
                $cardBonuses = $cardInCart->getBonuses();

                foreach ($sizeMaterialBonuses as $bonus) {
                    if (!empty($cardBonuses[$bonus['name']])) {
                        $cardPayload->bonuses['data'][] = [
                            'name' => $bonus['name'],
                            'value' => $cardBonuses[$bonus['name']],
                            'price' => $bonus['price']
                        ];
                        $cardPayload->final_price += $bonus['price'];
                    }
                }

                // Handle non real player as that has more fields to process
                //if ($cardInCartAsArray["cardType"] !== "realPlayer") {
                $cardPayload->club_image_id = null;
                $humanCardIndex = $cardIndex + 1;

                // Process player image
                $uploadedPlayerImagePath = $cardInCartAsArray["playerImagePathname"];
                $extension = pathinfo(basename($uploadedPlayerImagePath), PATHINFO_EXTENSION);
                $filename = "hrac.$extension";
                $randomFileName = "hrac-" . $this->getRandomFileName($extension);

                $filepath = "/Objednávky/$orderUuid/Karty/$humanCardIndex/$randomFileName";
                $playerImageEntity = Files::create([
                    'filepath' => $filepath,
                    'filename' => $filename,
                    'mimeType' => $fs->mimeType($uploadedPlayerImagePath),
                ]);
                $fs->move(
                    $uploadedPlayerImagePath,
                    $filepath
                );
                $cardPayload->player_image = $playerImageEntity->id;

                if (!empty($cardInCartAsArray["clubImagePathname"])) {
                    $uploadedClubImagePath = $cardInCartAsArray["clubImagePathname"];
                    $extension = pathinfo(basename($uploadedClubImagePath), PATHINFO_EXTENSION);
                    $filename = "klub.$extension";
                    $randomFileName = "klub-" . $this->getRandomFileName($extension);

                    $filepath = "/Objednávky/$orderUuid/Karty/$humanCardIndex/$randomFileName";
                    $clubImageEntity = Files::create([
                        'filepath' => $filepath,
                        'filename' => $filename,
                        'mimeType' => $fs->mimeType($uploadedClubImagePath),
                    ]);
                    $fs->move(
                        $uploadedClubImagePath,
                        $filepath
                    );
                    $cardPayload->club_image_id = $clubImageEntity->id;
                }

                // Process other data
                $cardPayload->rating = $cardInCartAsArray["rating"];
                $cardPayload->stats = [
                    "data" => $cardInCartAsArray["stats"]
                ];
                $cardPayload->country_id = intval($cardInCartAsArray["country_id"]);
                //}

                $cardPayload->currency = "CZK";

                $createdCard = $cardsService->create((array)$cardPayload);
                $createdCards[] = $createdCard;
                $orderPayload->cards["data"][] = [
                    "card_id" => $createdCard->id
                ];

                // Delete image
                $cardInCart->setPlayerImage(null);
                $cardInCart->setClubImage(null);

                $userEmailTemplatePayload['cards'][] = [
                    'title' => $createdCard->name,
                    'subtitle' => '', // TODO
                    'price' => "Cena: <b>$createdCard->final_price Kč</b>",
                    'img' => [
                        "src" => $config->app->baseUrl . "/api/entry-types/files/items/$createdCard->background_id/raw?w=90"
                    ]
                ];
            }
        }

        // Process products
        $products = $cart->getProducts();
        if (!empty($products)) {
            $mappedProducts = [];

            foreach ($products as $productInCartId => $productInCartInfo) {
                $mappedProducts[] = [
                    "product_id" => intval($productInCartId),
                    "count" => intval($productInCartInfo["count"])
                ];

                $userEmailTemplatePayload['products'][] = [
                    'title' => $productInCartInfo['product']['name'] . " " . $productInCartInfo["count"] . "x",
                    'price' => "Cena: <b>" . $productInCartInfo['price']['total'] . " Kč</b>",
                    'img' => [
                        'src' => $config->app->baseUrl . "/api/entry-types/files/items/$createdCard->background_id/raw?w=90"
                    ]
                ];
            }

            $orderPayload->products = ["data" => $mappedProducts];
        }

        // Finally create order
        $createdOrder = $ordersService->create((array)$orderPayload);

        foreach ($createdCards as $createdCard) {
            $createdCard->update([
                "order_id" => $createdOrder->id
            ]);
        }

        // Don`t forget to destroy cart!
        $cart->destroyState();

        $mailer = $this->container->get(Mailer::class);
        try {
            $userEmailContent = $rendering->getEnvironment()->render('@modules:EmailTemplates/OrderCreated.html', $userEmailTemplatePayload);
            $mailer->addAddress($orderPayload->email);
            $mailer->isHTML(true);
            $mailer->Subject = "Objednávka #$createdOrder->id na adcards.cz";
            $mailer->Body = $userEmailContent;
            $mailer->send();
        } catch (\Exception $error) {
            $this->container->get(Logger::class)->error("Failed to send or render email templates for user order confirm", [
                "error" => $error
            ]);
        }

        try {
            $adminEmailContent = $rendering->getEnvironment()->render('@modules:EmailTemplates/CommonWithButton.html', [
                "baseUrl" => $config->app->baseUrl,
                "buttonUrl" => $config->app->baseUrl . "/admin/entry-types/orders/entries/$createdOrder->id",
                "texts" => [
                    "button" => "Zobrazit objednávku",
                    "preview" => 'Nová objednávka',
                    "content" => "Na stránce adcards.cz byla vytvořena nová objednávka"
                ]
            ]);
            $mailer->addAddress("info@adcards.cz");
            $mailer->isHTML(true);
            $mailer->Subject = "Nová objednávka #$createdOrder->id na adcards.cz";
            $mailer->Body = $adminEmailContent;
            $mailer->send();
        } catch (\Exception $error) {
            $this->container->get(Logger::class)->error("Failed to send or render email templates for order admin confirm", [
                "error" => $error
            ]);
        }

        try {
            $promoCode = (new \PromoCodes())->query()->getOneById($promoCode['id']);

            $promoCode->update([
                'enabled' => $promoCode->wasCreatedForNewsletter ? false : true,
                'usedTimes' => ($promoCode->usedTimes ?? 0) + 1
            ]);
        } catch (\Exception $error) {
            $this->container->get(Logger::class)->error("Failed to update promoCode", [
                "error" => $error
            ]);
        }

        return $response->withHeader("HX-Location", "/objednavky/$orderUuid" . "?payment=true");
    }

    public function doTogglePromoCode_API(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $cart = $this->container->get(Cart::class);
        $body = $request->getParsedBody();

        if (!isset($body["code"])) {
            $response->withStatus(401);
        }

        $userHasPromoCodeAlready = !!$cart->getPromoCode();
        $template = "@modules:Adcards/partials/pages/cart/right-side/right-side.twig";
        $resultPayload = [
            "state" => [
                "successes" => [],
                "errors" => [],
            ]
        ];

        if ($userHasPromoCodeAlready) {
            $cart->deletePromoCode();

            $resultPayload["state"]["successes"][] = StaticMessages::PROMO_CODE_REMOVED;
        } else {
            $successfullyAdded = $cart->setPromoCode($body["code"]);

            if ($successfullyAdded) {
                $resultPayload["state"]["successes"][] = StaticMessages::PROMO_CODE_ADDED;
            } else {
                // In twig we check if "promoCode" is in array - keep this key here, otherview it will be rendered as
                // toast message
                $resultPayload["state"]["errors"]["promoCode"] = StaticMessages::PROMO_CODE_ACTIVATION_FAILED;
            }
        }

        $resultPayload = array_merge($resultPayload, $cart->stateToTemplateVariables());
        $this->container->get(RenderingService::class)->render($response, $template, $resultPayload);

        return $response;
    }
}