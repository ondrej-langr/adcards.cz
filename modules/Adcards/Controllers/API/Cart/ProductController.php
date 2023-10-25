<?php

namespace PromCMS\Modules\Adcards\Controllers\API\Cart;

use DI\Container;
use PromCMS\Core\Services\RenderingService;
use PromCMS\Modules\Adcards\Cart;
use PromCMS\Modules\Adcards\StaticMessages;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class ProductController
{
    private Container $container;

    public function __construct(Container $container)
    {
        $this->container = $container;
    }

//    Used only on product listing page
    public function append(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $cart = $this->container->get(Cart::class);
        $body = $request->getParsedBody();

        if (!isset($body["product-id"])) {
            $response->withStatus(401);
        }

        $cart->appendProduct($body["product-id"], $body["quantity"]);
        $rendering = $this->container->get(RenderingService::class);

        $rendering
            ->render($response, '@modules:Adcards/partials/mini-cart.twig', [
                'cartSize' => $cart->getCount()
            ]);

        $rendering
            ->render($response, "@modules:Adcards/components/toast-alert.twig", [
                "message" => StaticMessages::PRODUCT_ADDED
            ]);

        return $response
            ->withHeader("Cache-Control", "no-cache")
            ->withHeader("HX-Trigger", "{\"resetAddToCartQuantity\": \"\"}");
    }

    //    Used only in cart page
    public function update(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $cart = $this->container->get(Cart::class);
        $body = $request->getParsedBody();

        if (!isset($body["product-id"])) {
            $response->withStatus(401);
        }

        $productId = $body["product-id"];

        if (!empty($body["quantity"])) {
            $cart->changeProductQuantity($productId, intval($body["quantity"]));
        }

        $template = "@modules:Adcards/partials/pages/cart/right-side/right-side.twig";
        $resultPayload = [
            "state" => [
                "successes" => [
                    StaticMessages::CART_PRODUCT_UPDATE
                ],
                "errors" => [],
                // Pass this to tell right-side.twig that it should trigger focus for given css query
                "focusOn" => "#small-product-$productId input[name='quantity']" // this to retain ux, because focus is lost on response
            ],
        ];

        $resultPayload = array_merge($resultPayload, getCommonCartTemplateVariables($cart));
        $this->container->get(RenderingService::class)->render($response, $template, $resultPayload);

        return $response->withHeader("Cache-Control", "no-cache");
    }

    // Used only in cart page
    public function remove(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $params = $request->getQueryParams();
        $cart = $this->container->get(Cart::class);

        if (!isset($params["product-id"])) {
            $response->withStatus(401);
        }

        $cart->removeProduct($params["product-id"]);

        if (empty($cart->getProducts()) && empty($cart->getCards())) {
            return $response->withHeader("HX-Location", "/kosik");
        }

        $template = "@modules:Adcards/partials/pages/cart/right-side/right-side.twig";
        $resultPayload = [
            "state" => [
                "successes" => [
                    StaticMessages::PRODUCT_REMOVED
                ],
                "errors" => [],
            ]
        ];

        $resultPayload = array_merge($resultPayload, getCommonCartTemplateVariables($cart));
        $this->container->get(RenderingService::class)->render($response, $template, $resultPayload);

        return $response;
    }
}