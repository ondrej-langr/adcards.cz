<?php

namespace PromCMS\App\Controllers;

use DI\Container;
use Monolog\Logger;
use PromCMS\App\Cart;
use PromCMS\App\OrderStatus;
use PromCMS\App\PayPal;
use PromCMS\Core\Http\Routing\AsApiRoute;
use PromCMS\Core\Http\Routing\AsRoute;
use PromCMS\Core\Services\EntryTypeService;
use PromCMS\Core\Services\LocalizationService;
use PromCMS\Core\Services\RenderingService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class OrdersController
{
    private Container $container;
    private Logger $logger;

    public function __construct(Container $container)
    {
        $this->container = $container;
        $this->logger = $this->container->get(Logger::class);
    }

    #[AsApiRoute('GET', '/objednavky/{orderUuid}/pay/paypal/create', 'paypal-create-order')]
    public function payPalCreatePayment_API(ServerRequestInterface $request, ResponseInterface $response, $args): ResponseInterface
    {
        $orderUuid = $args["orderUuid"];

        try {
            $order = (new EntryTypeService(new \PromCMS\App\Models\Orders()))->getOne(["_uuid", "=", $orderUuid]);

            if ($order->payment_method !== "paypal") {
                throw new \Exception("Order cannot be paid with paypal, because it has different payment method selected");
            } else if ($order->status !== OrderStatus::UNPAID) {
                throw new \Exception("Order is paid");
            }
        } catch (\Exception $exception) {
            return $response->withStatus(404);
        }

        $payload = [
            "total" => $order->total_cost,
            "currency" => $order->currency
        ];

        try {
            $this->logger->info("Paypal create order", [
                "payload" => $payload
            ]);

            $payPalResponse = PayPal::createOrder($payload["total"], $payload["currency"]);
            $orderId = $payPalResponse->response->id;

            $this->logger->info("Paypal successfully created order '$orderId'", [
                "payload" => $payload,
                "response" => (array)$payPalResponse
            ]);
        } catch (\Exception $error) {
            $this->logger->error("Paypal create order failed", [
                "error" => $error,
                "payload" => $payload
            ]);

            throw $error;
        }

        $response->getBody()->write(json_encode($payPalResponse->response));

        return $response->withHeader("Content-Type", "application/json");
    }

    #[AsApiRoute('GET', '/objednavky/{orderUuid}/pay/paypal/capture', 'paypal-capture-order')]
    public function payPalCapturePayment_API(ServerRequestInterface $request, ResponseInterface $response, $args): ResponseInterface
    {
        $orderUuid = $args["orderUuid"];
        $payPalOrderId = $request->getQueryParams()["order_id"];
        $this->logger->info("before anything");

        try {
            $order = (new EntryTypeService(new \PromCMS\App\Models\Orders()))->getOne(["_uuid", "=", $orderUuid]);

            if ($order->payment_method !== "paypal") {
                $this->logger->info("order no paypal");
                throw new \Exception("Order cannot be paid with paypal, because it has different payment method selected");
            } else if ($order->status !== OrderStatus::UNPAID) {
                $this->logger->info("order paid");
                throw new \Exception("Order is paid");
            }
        } catch (\Exception $exception) {
            return $response->withStatus(200);
        }

        if (empty($payPalOrderId)) {
            return $response->withStatus(400);
        }

        $orderState = null;
        $paypalOrderResponse = null;

        // Check if order was previously paid already, if so then assign order state
        try {
            $paypalOrderResponse = PayPal::getOrderDetails($payPalOrderId);
            $orderState = $paypalOrderResponse->response;

            if ($orderState->status === "COMPLETED") {
                $this->logger->info("Paypal order $payPalOrderId: order was previously completed, returning previous state", [
                    "state" => $orderState,
                    "paypalResponse" => $paypalOrderResponse
                ]);
            } else {
                // Its not completed so we reset variables. Otherwise checkout in the next step wont be made
                $paypalOrderResponse = null;
                $orderState = null;
            }
        } catch (\Exception $error) {
            $this->logger->warning("Paypal order $payPalOrderId: failed to check if order was completed already", [
                "error" => $error,
                "paypalResponse" => $paypalOrderResponse
            ]);
        }

        // This wont run if it was previously completed but user wants to pay again (maybe some malfunction on their side)
        if ($orderState === null) {
            try {
                $paypalOrderResponse = PayPal::captureOrder($payPalOrderId);
                $orderState = $paypalOrderResponse->response;
            } catch (\Exception $error) {
                $this->logger->error("Paypal order $payPalOrderId: order payment capture failed (500)", [
                    "error" => $error,
                    "paypalResponse" => $paypalOrderResponse
                ]);

                throw $error;
            }
        }

        // Order state should be fulfilled by this point
        if (!empty($orderState->purchase_units[0]->payments)) {
            $payPalPayments = $orderState->purchase_units[0]->payments;
            $payPalTransaction = $payPalPayments->captures[0] ?? $payPalPayments->authorizations[0];
            $payPalTransactionId = $payPalTransaction->id;

            // Make notice to database
            $order->update([
                "status" => OrderStatus::PENDING,
                "paypal_transaction_id" => $payPalTransactionId
            ]);

            // Log this
            $this->logger->info("Paypal order $payPalOrderId: successfully captured payment", [
                "paypalResponse" => $paypalOrderResponse,
                "paypalTransactionId" => $payPalTransactionId
            ]);
        } else {
            $this->logger->error("Paypal order $payPalOrderId: order payment capture failed,  most likely because of no purchase units", [
                "paypalResponse" => $paypalOrderResponse
            ]);
        }

        $response->getBody()->write(json_encode($orderState));

        return $response->withStatus(200)->withHeader("Content-Type", "application/json");
    }

    #[AsRoute('GET', '/objednavky/{orderUuid}', 'orderPage')]
    public function getOne(ServerRequestInterface $request, ResponseInterface $response, $args): ResponseInterface
    {
        $orderUuid = $args["orderUuid"];
        $searchParams = $request->getQueryParams();
        $requestLanguage = $this->container->get(LocalizationService::class)->getCurrentLanguage();
        $templatePayload = [];

        try {
            $templatePayload["order"] = (new EntryTypeService(new \PromCMS\App\Models\Orders(), $requestLanguage))->getOne(["_uuid", "=", $orderUuid])->getData();
        } catch (\Exception $exception) {
            return $response->withStatus(404);
        }

        if (!empty($templatePayload["order"]["cards"]["data"])) {
            $orderedCards = $templatePayload["order"]["cards"]["data"];
            $orderedCards = (new EntryTypeService(new \PromCMS\App\Models\Cards()))->getMany(["id", "IN", array_column($orderedCards, "card_id")])["data"];

            $templatePayload["order"]["cards"] = array_map(function ($orderedCard) use ($requestLanguage) {
                $orderedCard["size"] = (new EntryTypeService(new \PromCMS\App\Models\CardSizes(), $requestLanguage))->getOne(["id", "=", intval($orderedCard["size_id"])])->getData();
                $orderedCard["background"] = (new EntryTypeService(new \PromCMS\App\Models\CardBackgrounds(), $requestLanguage))->getOne(["id", "=", intval($orderedCard["background_id"])])->getData();
                $orderedCard["size"]["material"] = (new EntryTypeService(new \PromCMS\App\Models\CardMaterial(), $requestLanguage))->getOne(["id", "=", intval($orderedCard["size"]["material_id"])])->getData();

                return $orderedCard;
            }, $orderedCards);
        }

        $orderedProducts = $templatePayload["order"]["products"]["data"];
        if (!empty($orderedProducts)) {
            $orderedProducts = (new EntryTypeService(new \PromCMS\App\Models\Products(), $requestLanguage))->getMany(["id", "IN", array_column($orderedProducts, "product_id")])["data"];

            $templatePayload["order"]["products"] = array_map(function ($product) use ($templatePayload) {
                // Find previous metadata under order - there is count and product_id
                $orderProductMetadata = $templatePayload["order"]["products"]["data"][array_search($product["id"], array_column($templatePayload["order"]["products"]["data"], "product_id"))];

                return array_merge($orderProductMetadata, ["product" => $product]);
            }, $orderedProducts);
        }

        $templatePayload["payPal"] = [
            "clientId" => $_ENV["PAYPAL_CLIENT_ID"]
        ];

        $templatePayload["shippingMethods"] = Cart::$availableShipping;
        $templatePayload["paymentMethods"] = Cart::$availablePaymentMethods;
        $templatePayload["showThankYou"] = isset($searchParams["thank-you"]);
        $templatePayload["showPaymentDialog"] = isset($searchParams["payment"]);

        return $this->container->get(RenderingService::class)->render($response, '@app/pages/objednavky/[order-uuid].twig', $templatePayload);
    }
}