<?php

namespace PromCMS\Modules\Adcards\Controllers\API;

use DI\Container;
use League\Flysystem\Filesystem;
use PromCMS\Core\Config;
use PromCMS\Core\Models\Files;
use PromCMS\Core\Services\EntryTypeService;
use PromCMS\Core\Services\RenderingService;
use PromCMS\Modules\Adcards\Cart;
use PromCMS\Modules\Adcards\OrderStatus;
use PromCMS\Modules\Adcards\UUID;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Middleware\Session;

class CartController
{
    private Container $container;

    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    public function checkout(ServerRequestInterface $request, ResponseInterface $response, $args)
    {
        $cart = $this->container->get(Cart::class);
        /**
         * @var $fs Filesystem
         * @var $session Session
         */
        $fs = $this->container->get("filesystem");
        $session = $this->container->get('session');

        if (empty($cart->getProducts()) && empty($cart->getCards())) {
            return $response->withStatus(400);
        }

        $rendering = $this->container->get(RenderingService::class);
        $parsedData = $request->getParsedBody();

        // This will be json when incoming
        if (!empty($parsedData["shippingMetadata"])) {
            $parsedData["shippingMetadata"] = (array)json_decode($parsedData["shippingMetadata"]);
        }

        $requiredFields = [
            "firstname",
            "lastname",
            "email",
            "phone",
            "street",
            "houseNumber",
            "city",
            "postalCode",
            "paymentMethod",
            "shippingMethod"
        ];
        $resultPayload = [
            "data" => $parsedData,
            "state" => [
                "form" => [
                    "errors" => [],
                    "values" => $parsedData
                ]
            ]
        ];
        $isValid = true;

        $missingFields = array_filter($requiredFields, fn($fieldName) => empty($parsedData[$fieldName]));
        if (!empty($missingFields)) {
            foreach ($missingFields as $fieldName) {
                $resultPayload["state"]["form"]["errors"][$fieldName] = "Vyplňte toto políčko, prosím!";
            }

            $isValid = false;
        }

        // Required fields are filled, lets check for validity of shippingMethod and paymentMethod
        if ($isValid) {
            if (!in_array($parsedData["paymentMethod"], array_keys(Cart::$availablePaymentMethods))) {
                $resultPayload["state"]["form"]["errors"]["paymentMethod"] = "Špatná hodnota, zvolte jinou hodnotu.";

                $isValid = false;
            }

            if (!in_array($parsedData["shippingMethod"], array_keys(Cart::$availableShipping))) {
                $resultPayload["state"]["form"]["errors"]["shippingMethod"] = "Špatná hodnota, zvolte jinou hodnotu.";

                $isValid = false;
            } else {
                $shippingMetadata = Cart::$availableShipping[$parsedData["shippingMethod"]];

                if (!empty($shippingMetadata["metadataRequiredFields"])) {
                    $metadataRequiredFields = $shippingMetadata["metadataRequiredFields"];
                    $missingMetadata = array_filter(
                        $metadataRequiredFields,
                        fn($metadataFieldName) => empty($parsedData["shippingMetadata"][$metadataFieldName])
                    );

                    if (!empty($missingMetadata)) {
                        $resultPayload["state"]["form"]["errors"]["shippingMethod"] = "Dokončete výběr dopravy!";

                        $isValid = false;
                    }
                }
            }
        }

        if (!$isValid) {
            $resultPayload["shippingMethods"] = Cart::$availableShipping;
            $resultPayload["paymentMethods"] = Cart::$availablePaymentMethods;

            $rendering->render($response,
                "@modules:Adcards/partials/pages/cart/left-side/left-side.twig",
                $resultPayload
            );

            return $response->withHeader("HX-Retarget", "#cart-left-side");
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
        $orderPayload->payment_method = $parsedData["paymentMethod"];
        $orderPayload->status = OrderStatus::CREATED;

        if ($promoCode = $cart->getPromoCode()) {
            $orderPayload->promo_code_value = $promoCode["code"];
            $orderPayload->promo_code_amount = intval($promoCode["amount"]);
        }

        $cardsInCart = $cart->getCards();
        if (!empty($cardsInCart)) {
            $cardsService = new EntryTypeService(new \Cards());
            $orderPayload->cards = ["data" => []];

            // TODO: implement creation
            foreach ($cardsInCart as $cardInCart) {
                $cardPayload = new \stdClass();
                $cardInCartAsArray = $cardInCart->asArray();

                $cardPayload->name = $cardInCartAsArray["name"];
                $cardPayload->background_id = intval($cardInCartAsArray["background_id"]);
                $cardPayload->sport_id = intval($cardInCartAsArray["sport_id"]);
                $cardPayload->size_id = intval($cardInCartAsArray["size_id"]);
                $cardPayload->card_type = $cardInCartAsArray["cardType"];

                // Handle non real player as that has more fields to process
                if ($cardInCartAsArray["cardType"] !== "realPlayer") {
                    $uploadedPlayerImagePath = $cardInCartAsArray["playerImagePathname"];
                    $filename = basename($uploadedPlayerImagePath);
                    $filepath = "/hraci-z-karet/" . $filename;
                    $playerImageEntity = Files::create([
                        'filepath' => $filepath,
                        'filename' => $filename,
                        'mimeType' => $fs->mimeType($uploadedPlayerImagePath),
                    ]);
                    $fs->move(
                        $uploadedPlayerImagePath,
                        $filepath
                    );

                    $cardPayload->rating = $cardInCartAsArray["rating"];
                    $cardPayload->stats = $cardInCartAsArray["stats"];
                    $cardPayload->country_id = intval($cardInCartAsArray["country_id"]);
                    $cardPayload->player_image = $playerImageEntity->id;
                }

                $cardPayload->final_price = $cardInCart->getPrice();
                $cardPayload->currency = "CZK";

                $createdCard = $cardsService->create((array)$cardPayload);
                $orderPayload->cards["data"][] = [
                    "card_id" => $createdCard->id
                ];
            }

        }

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

        $orderPayload->subtotal_cost = $cart->getTotal(false);
        $orderPayload->total_cost = $cart->getTotal(true);
        $orderPayload->currency = "CZK";

        $ordersService->create((array)$orderPayload);

        $session->delete("cart");

        return $response->withHeader("HX-Location", "/objednavky/$orderUuid");
    }
}