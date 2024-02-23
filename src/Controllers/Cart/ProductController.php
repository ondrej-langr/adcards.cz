<?php

namespace PromCMS\App\Controllers\Cart;

use PromCMS\App\Models\Carts;
use PromCMS\App\Models\Products;
use PromCMS\App\StaticMessages;
use PromCMS\Core\Database\EntityManager;
use PromCMS\Core\Http\Routing\AsApiRoute;
use PromCMS\Core\Services\RenderingService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class ProductController
{
//    Used only on product listing page
    #[AsApiRoute('POST', '/cart/product/append', 'add-to-cart')]
    public function append(ServerRequestInterface $request, ResponseInterface $response, EntityManager $em, RenderingService $rendering): ResponseInterface
    {
        /** @var Carts $cart */
        $cart = $request->getAttribute('cart');
        $body = $request->getParsedBody();

        if (!isset($body["product-id"])) {
            return $response->withStatus(401);
        }

        $productToUpdate = $em->getRepository(Products::class)->find(intval($body["product-id"]));
        if (!$productToUpdate) {
            return $response->withStatus(404);
        }

        $requestedQuantity = intval($body["quantity"] ?? 1);

        if ($existing = $cart->getProductCartByProduct($productToUpdate)) {
            $requestedQuantity += $existing->getCount();
        }

        $cart->updateProduct($productToUpdate, $requestedQuantity, $em);

        $em->flush();

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
                    array_merge(['cart' => $cart], ["oob" => true])
                );
        }

        return $response
            ->withHeader("Cache-Control", "no-cache")
            ->withHeader("HX-Trigger", "{\"resetAddToCartQuantity\": \"\"}");
    }

    //    Used only in cart page
    #[AsApiRoute('POST', '/cart/product/update', 'updateProductInCart')]
    public function update(ServerRequestInterface $request, ResponseInterface $response, EntityManager $em, RenderingService $rendering): ResponseInterface
    {
        /** @var Carts $cart */
        $cart = $request->getAttribute('cart');
        $body = $request->getParsedBody();

        if (!isset($body["product-id"])) {
            $response->withStatus(401);
        }

        $productToUpdate = $em->getRepository(Products::class)->find(intval($body["product-id"]));
        if (!$productToUpdate || empty($body["quantity"])) {
            return $response->withStatus(404);
        }

        $productId = $productToUpdate->getId();
        $cart->updateProduct($productToUpdate, intval($body["quantity"]), $em);

        $em->flush();

        $template = "@app/partials/pages/cart/right-side/right-side.twig";
        $resultPayload = [
            'cart' => $cart,
            "state" => [
                "successes" => [
                    StaticMessages::CART_PRODUCT_UPDATE
                ],
                "errors" => [],
                // Pass this to tell right-side.twig that it should trigger focus for given css query
                "focusOn" => "#small-product-$productId input[name='quantity']" // this to retain ux, because focus is lost on response
            ],
        ];

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
    public function remove(ServerRequestInterface $request, ResponseInterface $response, EntityManager $em, RenderingService $rendering): ResponseInterface
    {
        /** @var Carts $cart */
        $cart = $request->getAttribute('cart');
        $params = $request->getQueryParams();

        if (!isset($params["product-id"])) {
            $response->withStatus(401);
        }

        $productToUpdate = $em->getRepository(Products::class)->find(intval($params["product-id"]));
        if (!$productToUpdate) {
            return $response->withStatus(404);
        }

        $cart->removeProductById($productToUpdate, $em);
        $em->flush();

        if (empty($cart->getProducts()) && empty($cart->getCards())) {
            return $response->withHeader("HX-Location", "/kosik");
        }

        $template = "@app/partials/pages/cart/right-side/right-side.twig";
        $resultPayload = [
            'cart' => $cart,
            "state" => [
                "successes" => [
                    StaticMessages::PRODUCT_REMOVED
                ],
                "errors" => [],
            ]
        ];

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