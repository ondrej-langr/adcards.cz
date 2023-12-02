<?php

namespace PromCMS\Modules\Adcards;


use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use mysql_xdevapi\Exception;
use Psr\Http\Message\ResponseInterface;

class PayPal
{

    private static $PAYPAL_API_BASE = "https://api-m.sandbox.paypal.com";

    static private function getPaypalAccessToken()
    {
        $paypalClientId = $_ENV["PAYPAL_CLIENT_ID"];
        $paypalClientSecret = $_ENV["PAYPAL_CLIENT_SECRET"];

        try {
            $requestClient = new Client();

            if (!$paypalClientId || !$paypalClientSecret) {
                throw new \Exception("MISSING_API_CREDENTIALS");
            }

            $auth = base64_encode("$paypalClientId:$paypalClientSecret");

            $response = $requestClient->request(
                'POST',
                self::$PAYPAL_API_BASE . "/v1/oauth2/token",
                [
                    'body' => "grant_type=client_credentials",
                    'headers' => [
                        'Authorization' => "Basic $auth",
                    ]
                ]
            );

            $data = json_decode($response->getBody()->getContents());
            return $data->access_token;
        } catch (\Exception $error) {
            // TODO: send exception to logger
            // console.error("Failed to generate Access Token:", error);
        }
    }

    static private function handlePayPalResponse(ResponseInterface $response)
    {
        try {
            $jsonResponse = json_decode($response->getBody()->getContents());

            return (object)[
                "response" => $jsonResponse,
                "httpStatusCode" => $response->getStatusCode(),
            ];
        } catch (Exception $error) {
            throw new \Exception($response);
        }
    }

    // called when user decides to pay, but not yet payed
    static function createOrder(int $price, string $currencyCode)
    {
        $accessToken = self::getPaypalAccessToken();
        $url = self::$PAYPAL_API_BASE . "/v2/checkout/orders";
        $requestClient = new Client();

        $response = $requestClient->request(
            'POST',
            $url,
            [
                'json' => [
                    "intent" => "CAPTURE",
                    'purchase_units' => [
                        [
                            'amount' =>
                                [
                                    'currency_code' => $currencyCode,
                                    'value' => $price,
                                ],
                        ],
                    ],
                ],
                'headers' => [
                    'Authorization' => "Bearer $accessToken",
                    // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
                    // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
                    // "PayPal-Mock-Response" => '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
                    // "PayPal-Mock-Response" => '{"mock_application_codes": "PERMISSION_DENIED"}'
                    // "PayPal-Mock-Response" => '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
                ]
            ]
        );

        return self::handlePayPalResponse($response);
    }

    static function getOrderDetails(string $orderID)
    {
        $accessToken = self::getPaypalAccessToken();
        $url = self::$PAYPAL_API_BASE . "/v2/checkout/orders/$orderID";
        $requestClient = new Client();

        $response = $requestClient->request(
            'GET',
            $url,
            [
                'headers' => [
                    "Content-Type" => "application/json",
                    'Authorization' => "Bearer $accessToken",
                ]
            ]
        );

        return self::handlePayPalResponse($response);
    }

    static function captureOrder(string $orderID)
    {
        $accessToken = self::getPaypalAccessToken();
        $url = self::$PAYPAL_API_BASE . "/v2/checkout/orders/$orderID/capture";
        $requestClient = new Client();

        try {
            $response = $requestClient->request(
                'POST',
                $url,
                [
                    'headers' => [
                        "Content-Type" => "application/json",
                        'Authorization' => "Bearer $accessToken",
                        // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
                        // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
                        // "PayPal-Mock-Response" => '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
                        // "PayPal-Mock-Response" => '{"mock_application_codes": "TRANSACTION_REFUSED"}'
                        // "PayPal-Mock-Response" => '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
                    ]
                ]
            );

            return self::handlePayPalResponse($response);
        } catch (RequestException $error) {
            if ($error->hasResponse()) {
                $response = $error->getResponse();

                if ($response->getStatusCode() >= 400 || 500 <= $error->getResponse()->getStatusCode()) {
                    return self::handlePayPalResponse($response);
                }
            }

            throw $error;
        } catch (\Exception $error) {
            throw $error;
        }
    }
}