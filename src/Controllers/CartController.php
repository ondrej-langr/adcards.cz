<?php

namespace PromCMS\App\Controllers;

use DI\Container;
use MongoDB\Driver\Exception\ExecutionTimeoutException;
use Opis\JsonSchema\Errors\ErrorFormatter;
use Opis\JsonSchema\Errors\ValidationError;
use Opis\JsonSchema\Validator;
use PromCMS\App\Models\Base\OrderState;
use PromCMS\App\Models\Cards;
use PromCMS\App\Models\CartProducts;
use PromCMS\App\Models\Carts;
use PromCMS\App\Models\OrderedProducts;
use PromCMS\App\Models\Orders;
use PromCMS\App\Models\PromoCodes;
use PromCMS\App\OrderStatus;
use PromCMS\App\StaticMessages;
use PromCMS\App\UUID;
use PromCMS\Core\Database\EntityManager;
use PromCMS\Core\Http\Routing\AsApiRoute;
use PromCMS\Core\Http\Routing\AsRoute;
use PromCMS\Core\Logger;
use PromCMS\Core\Mailer;
use PromCMS\Core\PromConfig;
use PromCMS\Core\Services\RenderingService;
use PromCMS\Core\Utils\FsUtils;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class CartController
{

    private static $errorMessagesForRequiredFields = [
        "*" => 'Toto políčko je povinné',
        "shippingMetadata" => "Dokončete výběr",
    ];
    private Container $container;
    private string $validationSchema;
    private Validator $validationSchemaValidator;

    private function getRandomFileName($extension)
    {
        $newBasename = bin2hex(random_bytes(8)) . '-' . time();

        return sprintf('%s.%0.8s', $newBasename, $extension);
    }

    private function getValidationSchema(): string
    {
        $parsedSchema = json_decode(FsUtils::readFile("@app/schemas/order.schema.json"));

        $parsedSchema->properties->paymentMethod->enum = array_keys(Carts::$availablePaymentMethods);
        $parsedSchema->properties->shippingMethod->enum = array_keys(Carts::$availableShipping);

        return json_encode($parsedSchema);
    }

    public function __construct(Container $container)
    {
        $this->container = $container;
        $this->validationSchema = $this->getValidationSchema();
        $validator = new Validator();
        $validator->setMaxErrors(20);
        $validator->resolver()->registerRaw($this->validationSchema, "checkout-validation");
        $this->validationSchemaValidator = $validator;
    }

    #[AsRoute('GET', '/kosik', 'cart')]
    public function get(ServerRequestInterface $request, ResponseInterface $response, RenderingService $rendering, EntityManager $em): ResponseInterface
    {
        $cart = $request->getAttribute('cart');

        $cart->updatePickedBonuses($em);
        $cart->checkForPromoCodeValidity();

        $em->flush();

        return $rendering
            ->render(
                $response,
                '@app/pages/kosik.twig',
                [
                    "cart" => $cart,
                    "validationSchema" => $this->validationSchema,
                    "errorMessagesForRequiredFields" => self::$errorMessagesForRequiredFields
                ]
            );
    }

    #[AsApiRoute('POST', '/cart/checkout-order', 'finish-order')]
    public function doCheckout_API(
        ServerRequestInterface   $request,
        ResponseInterface        $response,
        Logger                   $logger,
        \PromCMS\Core\Filesystem $fs,
        RenderingService         $rendering,
        PromConfig               $config,
        Mailer                   $mailer,
        EntityManager            $em
    )
    {
        /** @var Carts $cart */
        $cart = $request->getAttribute('cart');
        if (empty($cart->getProducts()) && empty($cart->getCards())) {
            return $response->withStatus(400);
        }

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
            $resultPayload = [
                'cart' => $cart,
                "data" => $parsedData,
                "state" => [
                    "form" => [
                        "errors" => [],
                        "values" => $parsedData
                    ]
                ]
            ];

            $resultPayload["shippingMethods"] = Carts::$availableShipping;
            $resultPayload["paymentMethods"] = Carts::$availablePaymentMethods;
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
                "@app/pages/kosik.twig",
                $resultPayload
            );

            return $response->withHeader("HX-Retarget", "#app-cart");
        }
        $projectBaseUrl = $config->getProject()->url->__toString();

        // Prepare
        $orderUuid = UUID::create();
        $userEmailTemplatePayload = [
            "baseUrl" => $projectBaseUrl,
            "buttonUrl" => "$projectBaseUrl/objednavky/$orderUuid",
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

        $em->beginTransaction();

        try {
            $order = new Orders();

            $order
                ->set_uuid($orderUuid)
                ->setFirstName($parsedData["firstname"])
                ->setLastName($parsedData["lastname"])
                ->setEmail($parsedData["email"])
                ->setPhone($parsedData["phone"])
                ->setStreet($parsedData["street"])
                ->setBuildingNumber($parsedData["houseNumber"])
                ->setCity($parsedData["city"])
                ->setPostalCode($parsedData["postalCode"])
                ->setNote($parsedData["note"])
                ->setShippingMethod($parsedData["shippingMethod"])
                ->setShippingRate(intval(Carts::$availableShipping[$parsedData["shippingMethod"]]["rate"]))
                ->setPaymentMethod($parsedData["paymentMethod"])
                ->setStatus(OrderState::UNPAID);

            $userEmailTemplatePayload['payment']['value'] = Carts::$availablePaymentMethods[$order->getPaymentMethod()]['title'];

            // parse shipping into readable format, but still leave that parsable
            $shippingMetadata = Carts::$availableShipping[$parsedData["shippingMethod"]];
            $userEmailTemplatePayload['shipping']['value'] = Carts::$availableShipping[$order->getShippingMethod()]['title'];
            if (!empty($shippingMetadata["metadataRequiredFields"])) {
                $shippingMethodMetadata = implode(
                    ", ",
                    array_map(
                        fn($metadataFieldName) => $parsedData["shippingMetadata"][$metadataFieldName],
                        $shippingMetadata["metadataRequiredFields"]
                    )
                );

                $order->setShippingMethod(($order->getShippingMethod() ?? '') . "; $shippingMethodMetadata");
                $userEmailTemplatePayload['shipping']['value'] .= "; $shippingMethodMetadata";
            }
            $userEmailTemplatePayload['shipping']['price']['value'] = $order->getShippingRate() . " Kč";

            // Process price
            $subtotal = $cart->getTotalPrice();
            $order->setTotalCost($subtotal + $order->getShippingRate());

            $userEmailTemplatePayload['subtotal']['value'] = "$subtotal Kč";
            $userEmailTemplatePayload['price']['value'] = $order->getTotalCost() . " Kč";

            // Process promo code
            if ($promoCode = $cart->getPromoCode()) {
                $order->setPromoCodeValue($promoCode->getCode());
                $order->setPromoCodeAmount($promoCode->getAmount());

                $userEmailTemplatePayload['subtotal']['value'] = "<s>" . $cart->getTotalPrice(false) . " Kč</s>" . $subtotal . " Kč";
            }

            if ($cart->getCards()->count()) {
                /** @var Cards $cardInCart */
                foreach ($cart->getCards() as $cardInCart) {
                    $size = $cardInCart->getSize();
                    $materialName = $cardInCart->getSize()->getMaterial()->getName();
                    $sizeWidth = $size->getWidth();
                    $sizeHeight = $size->getHeight();
                    $backgroundId = $cardInCart->getBackground()->getId();
                    $cardInCart->setFinalPrice($cardInCart->createPrice());

                    // Move it from cart to order
                    $cardInCart->setCart(null)->setForOrder($order);
                    $order->getCards()->add($cardInCart);

                    $userEmailTemplatePayload['cards'][] = [
                        'title' => $cardInCart->getName(),
                        'subtitle' => "<span class='uppercase'>$materialName (" . $sizeWidth . "x" . $sizeHeight . "cm)</span>", // TODO
                        'price' => "Cena: <b>" . $cardInCart->getFinalPrice() . " Kč</b>",
                        'bonuses' => $cardInCart->getBonuses()['data'] ?? [],
                        'img' => [
                            "src" => "$projectBaseUrl/api/library/files/items/$backgroundId?w=90"
                        ]
                    ];
                }
            }

            if (count($products = $cart->getProducts())) {
                /** @var CartProducts $productInCart */
                foreach ($products as $productInCart) {
                    $productInOrder = new OrderedProducts();

                    $productInOrder->setForOrder($order);
                    $order->getProducts()->add($productInOrder);

                    $productInOrder->setProduct($productInCart->getProduct());
                    $productInOrder->setCount($productInCart->getCount());

                    $em->persist($productInOrder);
                    $em->remove($productInCart);

                    $productTemplateData = [
                        'title' => $productInOrder->getProduct()->getName() . " " . $productInOrder->getCount() . "x",
                        'price' => "Cena: <b>" . $productInOrder->getTotalPrice() . " Kč</b>",
                    ];

                    if ($productImage = ($productInOrder->getProduct()->getImages() ?? [])[0]) {
                        $productImageId = $productImage->getId();
                        $productTemplateData['img'] = [
                            'src' => "$projectBaseUrl/api/library/files/items/$productImageId?w=90"
                        ];
                    }

                    $userEmailTemplatePayload['products'][] = $productTemplateData;
                }
            }

            $promoCode
                ?->setUsedTimes(($promoCode->getUsedTimes() ?? 0) + 1)
                ->setEnabled(!$promoCode->getWasCreatedForNewsletter());

            $em->persist($order);
            $em->remove($cart);

            $orderId = $order->getId();

            if (!$orderId) {
                throw new \Exception('No id!');
            }

            $userEmailContent = $rendering->getEnvironment()->render('@app/OrderCreated.html', $userEmailTemplatePayload);
            $mailer->addAddress($order->getEmail());
            $mailer->isHTML(true);
            $mailer->Subject = "Objednávka #$orderId na adcards.cz";
            $mailer->Body = $userEmailContent;
            $mailer->send();

            // We don't have send admin files necessary, if it fails then just continue
            try {
                $adminEmailContent = $rendering->getEnvironment()->render('@app/CommonWithButton.html', [
                    "baseUrl" => $projectBaseUrl,
                    "buttonUrl" => "$projectBaseUrl/admin/entities/orders/$orderId",
                    "texts" => [
                        "button" => "Zobrazit objednávku",
                        "preview" => 'Nová objednávka',
                        "content" => "Na stránce adcards.cz byla vytvořena nová objednávka"
                    ]
                ]);
                $mailer->addAddress("info@adcards.cz");
                $mailer->isHTML(true);
                $mailer->Subject = "Nová objednávka #$orderId na adcards.cz";
                $mailer->Body = $adminEmailContent;
                $mailer->send();
            } catch (\Exception $error) {
                $logger->error("Failed to send or render email templates for order admin confirm", [
                    "error" => $error
                ]);
            }

            $resp = $response->withHeader("HX-Location", "/objednavky/$orderUuid" . "?payment=true");

            $em->commit();

            return $resp;
        } catch (\Exception $error) {
            if ($em->getConnection()->isTransactionActive()) {
                $em->getConnection()->rollBack();
            }

            $logger->error("Failed to create an order", [
                "error" => $error
            ]);

            throw $error;
        }
    }

    #[AsApiRoute('POST', '/cart/promo-code/toggle', 'toggle-promo-code')]
    public function doTogglePromoCode_API(ServerRequestInterface $request, ResponseInterface $response, RenderingService $renderingService, EntityManager $em): ResponseInterface
    {
        /** @var Carts $cart */
        $cart = $request->getAttribute('cart');
        $body = $request->getParsedBody();

        if (!isset($body["code"])) {
            $response->withStatus(401);
        }

        $userHasPromoCodeAlready = !!$cart->getPromoCode();
        $template = "@app/partials/pages/cart/right-side/right-side.twig";
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
            $promoCode = $em->getRepository(PromoCodes::class)->findOneBy([
                'code' => $body["code"]
            ]);

            if ($promoCode) {
                $cart->setPromoCode($promoCode);
                $resultPayload["state"]["successes"][] = StaticMessages::PROMO_CODE_ADDED;
            } else {
                // In twig we check if "promoCode" is in array - keep this key here, otherview it will be rendered as
                // toast message
                $resultPayload["state"]["errors"]["promoCode"] = StaticMessages::PROMO_CODE_ACTIVATION_FAILED;
            }
        }

        $em->flush();

        $resultPayload = array_merge($resultPayload, [
            'cart' => $cart
        ]);
        $renderingService->render($response, $template, $resultPayload);

        return $response;
    }
}