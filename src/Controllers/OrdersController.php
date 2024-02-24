<?php

namespace PromCMS\App\Controllers;

use DI\Container;
use Doctrine\ORM\Query;
use PromCMS\App\Models\Base\OrderState;
use PromCMS\App\Models\Carts;
use PromCMS\App\Models\Orders;
use PromCMS\App\PayPal;
use PromCMS\Core\Database\EntityManager;
use PromCMS\Core\Database\Query\TranslationWalker;
use PromCMS\Core\Exceptions\EntityNotFoundException;
use PromCMS\Core\Http\Routing\AsApiRoute;
use PromCMS\Core\Http\Routing\AsRoute;
use PromCMS\Core\Logger;
use PromCMS\Core\Services\RenderingService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class OrdersController
{
    private Container $container;

    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    #[AsApiRoute('GET', '/objednavky/{orderUuid}/pay/paypal/create', 'paypal-create-order')]
    public function payPalCreatePayment_API(ServerRequestInterface $request, ResponseInterface $response, $orderUuid, Logger $logger, EntityManager $em): ResponseInterface
    {
        try {
            $order = $em->getRepository(Orders::class)->find([
                '_uuid' => $orderUuid
            ]);

            if (!$order) {
                throw new EntityNotFoundException();
            }

            if ($order->getPaymentMethod() !== "paypal") {
                throw new \Exception("Order cannot be paid with paypal, because it has different payment method selected");
            } else if ($order->getStatus() !== OrderState::UNPAID) {
                throw new \Exception("Order is paid");
            }
        } catch (\Exception $exception) {
            return $response->withStatus(404);
        }

        $payload = [
            "total" => $order->getTotalCost(),
            "currency" => 'CZK'
        ];

        try {
            $logger->info("Paypal create order", [
                "payload" => $payload
            ]);

            $payPalResponse = PayPal::createOrder($payload["total"], $payload["currency"]);
            $orderId = $payPalResponse->response->id;

            $logger->info("Paypal successfully created order '$orderId'", [
                "payload" => $payload,
                "response" => (array)$payPalResponse
            ]);
        } catch (\Exception $error) {
            $logger->error("Paypal create order failed", [
                "error" => $error,
                "payload" => $payload
            ]);

            throw $error;
        }

        $response->getBody()->write(json_encode($payPalResponse->response));

        return $response->withHeader("Content-Type", "application/json");
    }

    #[AsApiRoute('GET', '/objednavky/{orderUuid}/pay/paypal/capture', 'paypal-capture-order')]
    public function payPalCapturePayment_API(ServerRequestInterface $request, ResponseInterface $response, Logger $logger, EntityManager $em, $orderUuid): ResponseInterface
    {
        $payPalOrderId = $request->getQueryParams()["order_id"];

        try {
            $order = $em->getRepository(Orders::class)->find([
                '_uuid' => $orderUuid
            ]);

            if (!$order) {
                throw new EntityNotFoundException();
            }

            if ($order->getPaymentMethod() !== "paypal") {
                throw new \Exception("Order cannot be paid with paypal, because it has different payment method selected");
            } else if ($order->getStatus() !== OrderState::UNPAID) {
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
                $logger->info("Paypal order $payPalOrderId: order was previously completed, returning previous state", [
                    "state" => $orderState,
                    "paypalResponse" => $paypalOrderResponse
                ]);
            } else {
                // Its not completed so we reset variables. Otherwise checkout in the next step wont be made
                $paypalOrderResponse = null;
                $orderState = null;
            }
        } catch (\Exception $error) {
            $logger->warning("Paypal order $payPalOrderId: failed to check if order was completed already", [
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
                $logger->error("Paypal order $payPalOrderId: order payment capture failed (500)", [
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
            $order->setStatus(OrderState::NOT_VERIFIED);
            $order->setPaypalTransactionId($payPalTransactionId);

            $em->flush();

            // Log this
            $logger->info("Paypal order $payPalOrderId: successfully captured payment", [
                "paypalResponse" => $paypalOrderResponse,
                "paypalTransactionId" => $payPalTransactionId
            ]);
        } else {
            $logger->error("Paypal order $payPalOrderId: order payment capture failed,  most likely because of no purchase units", [
                "paypalResponse" => $paypalOrderResponse
            ]);
        }

        $response->getBody()->write(json_encode($orderState));

        return $response->withStatus(200)->withHeader("Content-Type", "application/json");
    }

    #[AsRoute('GET', '/objednavky/{orderUuid}', 'orderPage')]
    public function getOne(ServerRequestInterface $request, ResponseInterface $response, EntityManager $em, $orderUuid): ResponseInterface
    {
        $searchParams = $request->getQueryParams();
        $requestLanguage = $request->getAttribute('lang');
        $templatePayload = [];

        try {
            $order = $em->createQueryBuilder()
                ->from(Orders::class, 'o')
                ->select('o')
                ->where('o._uuid = :uuid')
                ->setParameter(':uuid', $orderUuid)
                ->getQuery()
                ->setHint(Query::HINT_CUSTOM_OUTPUT_WALKER, TranslationWalker::class)
                ->setHint(TranslationWalker::HINT_LOCALE, $requestLanguage)
                ->getOneOrNullResult();

            if (!$order) {
                throw new EntityNotFoundException();
            }

            $templatePayload["order"] = $order;
        } catch (\Exception $exception) {
            return $response->withStatus(404);
        }

        $templatePayload["payPal"] = [
            "clientId" => $_ENV["PAYPAL_CLIENT_ID"]
        ];

        $templatePayload["shippingMethods"] = Carts::$availableShipping;
        $templatePayload["paymentMethods"] = Carts::$availablePaymentMethods;
        $templatePayload["showThankYou"] = isset($searchParams["thank-you"]);
        $templatePayload["showPaymentDialog"] = isset($searchParams["payment"]);

        return $this->container->get(RenderingService::class)->render($response, '@app/pages/objednavky/[order-uuid].twig', $templatePayload);
    }
}