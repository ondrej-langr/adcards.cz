<?php

namespace PromCMS\App\Controllers\Cart;

use DI\Container;
use PromCMS\App\Cart;
use PromCMS\App\StaticMessages;
use PromCMS\Core\Http\Routing\AsApiRoute;
use PromCMS\Core\Services\RenderingService;
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
    #[AsApiRoute('POST', '/cart/product/append', 'add-to-cart')]
    public function append(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $cart = $this->container->get(Cart::class);
        $body = $request->getParsedBody();

        if (!isset($body["product-id"])) {
            return $response->withStatus(401);
        }

        $cart->appendProduct($body["product-id"], $body["quantity"] ?? 1);
        $rendering = $this->container->get(RenderingService::class);

        $rendering
            ->render($response, '@app/partials/mini-cart.twig', [
                'cartSize' => $cart->getCount()
            ]);

        $rendering
            ->render($response, "@app/components/toast-alert.twig", [
                "message" => StaticMessages::PRODUCT_ADDED
            ]);

        if (str_contains($request->getHeader("Hx-Current-Url")[0], "/kosik")) {
            $rendering
                ->render(
                    $response,
                    '@app/partials/pages/cart/right-side/right-side.twig',
                    array_merge($cart->stateToTemplateVariables(), ["oob" => true])
                );
        }

        return $response
            ->withHeader("Cache-Control", "no-cache")
            ->withHeader("HX-Trigger", "{\"resetAddToCartQuantity\": \"\"}");
    }

    //    Used only in cart page
    #[AsApiRoute('POST', '/cart/product/update', 'updateProductInCart')]
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

        $rendering = $this->container->get(RenderingService::class);
        $template = "@app/partials/pages/cart/right-side/right-side.twig";
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

        $resultPayload = array_merge($resultPayload, $cart->stateToTemplateVariables());
        // Render main content first
        $rendering
            ->render($response, $template, $resultPayload);

        // And render oob which is replaced on the page which ensures updated cart
        $rendering
            ->render($response, '@app/partials/mini-cart.twig', [
                'cartSize' => $cart->getCount(),
                'oob' => true
            ]);

        return $response->withHeader("Cache-Control", "no-cache");
    }

    // Used only in cart page
    #[AsApiRoute('DELETE', '/cart/product/remove', 'removeFromCart')]
    public function remove(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $params = $request->getQueryParams();
        $cart = $this->container->get(Cart::class);
        $rendering = $this->container->get(RenderingService::class);

        if (!isset($params["product-id"])) {
            $response->withStatus(401);
        }

        $cart->removeProduct($params["product-id"]);

        if (empty($cart->getProducts()) && empty($cart->getCards())) {
            return $response->withHeader("HX-Location", "/kosik");
        }

        $template = "@app/partials/pages/cart/right-side/right-side.twig";
        $resultPayload = [
            "state" => [
                "successes" => [
                    StaticMessages::PRODUCT_REMOVED
                ],
                "errors" => [],
            ]
        ];

        $resultPayload = array_merge($resultPayload, $cart->stateToTemplateVariables());
        $rendering
            ->render($response, $template, $resultPayload);

        $rendering
            ->render($response, '@app/partials/mini-cart.twig', [
                'cartSize' => $cart->getCount(),
                'oob' => true
            ]);

        return $response;
    }
}