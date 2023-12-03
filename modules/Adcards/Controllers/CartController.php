<?php

namespace PromCMS\Modules\Adcards\Controllers;

use DI\Container;
use League\Flysystem\Filesystem;
use Monolog\Logger;
use mysql_xdevapi\Exception;
use Opis\JsonSchema\Errors\ErrorFormatter;
use Opis\JsonSchema\Errors\ValidationError;
use Opis\JsonSchema\Validator;
use PromCMS\Core\Models\Files;
use PromCMS\Core\Services\EntryTypeService;
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
                $message = isset(self::$errorMessagesForRequiredFields[$missingField])
                    ? self::$errorMessagesForRequiredFields[$missingField]
                    : self::$errorMessagesForRequiredFields["*"];

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
        $ordersService = new EntryTypeService(new \Orders());

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

        // parse shipping into readable format, but still leave that parsable
        $shippingMetadata = Cart::$availableShipping[$parsedData["shippingMethod"]];
        if (!empty($shippingMetadata["metadataRequiredFields"])) {
            $orderPayload->shipping_method .= "; ";
            $orderPayload->shipping_method .= implode(
                ", ",
                array_map(
                    fn($metadataFieldName) => $parsedData["shippingMetadata"][$metadataFieldName],
                    $shippingMetadata["metadataRequiredFields"]
                )
            );
        }

        // Process promo code
        if ($promoCode = $cart->getPromoCode()) {
            $orderPayload->promo_code_value = $promoCode["code"];
            $orderPayload->promo_code_amount = intval($promoCode["amount"]);
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
                $cardPayload->size_id = intval($cardInCartAsArray["size_id"]);
                $cardPayload->card_type = $cardInCartAsArray["cardType"];

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

                $cardPayload->final_price = $cardInCart->getPrice();
                $cardPayload->currency = "CZK";

                $createdCard = $cardsService->create((array)$cardPayload);
                $createdCards[] = $createdCard;
                $orderPayload->cards["data"][] = [
                    "card_id" => $createdCard->id
                ];

                // Delete image
                $cardInCart->setPlayerImage(null);
                $cardInCart->setClubImage(null);
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
            }

            $orderPayload->products = ["data" => $mappedProducts];
        }

        // Process price
        $orderPayload->total_cost = $cart->getTotal(true) + $orderPayload->shipping_rate;
        $orderPayload->currency = "CZK";

        // Finally create order
        $createdOrder = $ordersService->create((array)$orderPayload);

        foreach ($createdCards as $createdCard) {
            $createdCard->update([
                "order_id" => $createdOrder->id
            ]);
        }

        // Don`t forget to destroy cart!
        $cart->destroyState();

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