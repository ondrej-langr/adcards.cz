<?php

namespace PromCMS\Modules\Adcards\Controllers;

use DI\Container;
use PromCMS\Core\Services\EntryTypeService;
use PromCMS\Core\Services\RenderingService;
use PromCMS\Modules\Adcards\Cart;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class OrdersController
{
    private Container $container;

    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    public function getOne(ServerRequestInterface $request, ResponseInterface $response, $args): ResponseInterface
    {
        $orderUuid = $args["orderUuid"];

        try {
            $order = (new EntryTypeService(new \Orders()))->getOne(["_uuid", "=", $orderUuid]);
        } catch (\Exception $exception) {
            return $response->withStatus(404);
        }

        return $this->container->get(RenderingService::class)->render($response, '@modules:Adcards/pages/objednavky/[order-uuid].twig');
    }
}