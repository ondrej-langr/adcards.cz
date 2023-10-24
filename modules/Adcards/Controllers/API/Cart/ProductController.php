<?php

namespace PromCMS\Modules\Adcards\Controllers\API\Cart;

use DI\Container;
use PromCMS\Core\Services\RenderingService;
use PromCMS\Modules\Adcards\Cart;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class ProductController
{
    private Container $container;

    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    public function add(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $cart = $this->container->get(Cart::class);
        $body = $request->getParsedBody();

        if (!isset($body["product-id"])) {
            $response->withStatus(401);
        }

        $cart->appendProduct($body["product-id"], $body["quantity"]);
        $this->container->get(RenderingService::class)->render($response, '@modules:Adcards/partials/mini-cart.twig', [
            'cartSize' => $cart->getCount()
        ]);

        return $response->withHeader("Cache-Control", "no-cache");
    }

    public function remove(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $body = $request->getParsedBody();
        $cart = $this->container->get(Cart::class);

        if (!isset($body["product-id"])) {
            $response->withStatus(401);
        }

        $cart->removeProduct($body["product-id"]);

        $this->container->get(RenderingService::class)->render($response, '@modules:Adcards/partials/mini-cart.twig', [
            'cartSizeAfterCartUpdate' => $cart->getCount()
        ]);

        return $response;
    }
}