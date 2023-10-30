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
        $templatePayload = [];

        try {
            $templatePayload["order"] = (new EntryTypeService(new \Orders()))->getOne(["_uuid", "=", $orderUuid])->getData();
        } catch (\Exception $exception) {
            return $response->withStatus(404);
        }

        $orderedCards = $templatePayload["order"]["cards"];
        if (!empty($orderedCards)) {
            $orderedCards = (new EntryTypeService(new \Cards()))->getMany(["id", "IN", array_map(fn($item) => intval($item), $orderedCards)])["data"];

            $templatePayload["order"]["cards"] = array_map(function ($orderedCard) {
                $orderedCard["size"] = (new EntryTypeService(new \CardSizes()))->getOne(["id", "=", $orderedCard["size"]])->getData();
                $orderedCard["size"]["material"] = (new EntryTypeService(new \CardMaterial()))->getOne(["id", "=", $orderedCard["size"]["material"]])->getData();

                return $orderedCard;
            }, $orderedCards);
        }

        $orderedProducts = $templatePayload["order"]["products"];
        if (!empty($orderedProducts)) {
            $orderedProducts = (new EntryTypeService(new \Products()))->getMany(["id", "IN", array_map(fn($item) => intval($item), $orderedProducts)])["data"];

            $templatePayload["order"]["products"] = array_map(fn($product) => ["product" => $product], $orderedProducts);
        }


        return $this->container->get(RenderingService::class)->render($response, '@modules:Adcards/pages/objednavky/[order-uuid].twig', $templatePayload);
    }
}