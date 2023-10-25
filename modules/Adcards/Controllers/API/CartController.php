<?php

namespace PromCMS\Modules\Adcards\Controllers\API;

use DI\Container;
use PromCMS\Core\Services\RenderingService;
use PromCMS\Modules\Adcards\Cart;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class CartController
{
    private Container $container;

    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    public function checkout(ServerRequestInterface $request, ResponseInterface $response, $args)
    {
        $resultPayload = [
            "data" => $request->getParsedBody()
        ];

        $this->container->get(RenderingService::class)->render($response, "@modules:Adcards/partials/pages/cart/order-finished.twig", $resultPayload);


        return $response;
    }
}