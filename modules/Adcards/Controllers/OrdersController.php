<?php

namespace PromCMS\Modules\Adcards\Controllers;

use DI\Container;
use PromCMS\Core\Services\EntryTypeService;
use PromCMS\Core\Services\LocalizationService;
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
        $requestLanguage = $this->container->get(LocalizationService::class)->getCurrentLanguage();
        $templatePayload = [];

        try {
            $templatePayload["order"] = (new EntryTypeService(new \Orders(), $requestLanguage))->getOne(["_uuid", "=", $orderUuid])->getData();
        } catch (\Exception $exception) {
            return $response->withStatus(404);
        }

        $orderedCards = $templatePayload["order"]["cards"]["data"];
        if (!empty($orderedCards)) {
            $orderedCards = (new EntryTypeService(new \Cards()))->getMany(["id", "IN", array_column($orderedCards, "card_id")])["data"];

            $templatePayload["order"]["cards"] = array_map(function ($orderedCard) use ($requestLanguage) {
                $orderedCard["size"] = (new EntryTypeService(new \CardSizes(), $requestLanguage))->getOne(["id", "=", intval($orderedCard["size_id"])])->getData();
                $orderedCard["background"] = (new EntryTypeService(new \CardBackgrounds(), $requestLanguage))->getOne(["id", "=", intval($orderedCard["background_id"])])->getData();
                $orderedCard["size"]["material"] = (new EntryTypeService(new \CardMaterial(), $requestLanguage))->getOne(["id", "=", intval($orderedCard["size"]["material_id"])])->getData();

                return $orderedCard;
            }, $orderedCards);
        }

        $orderedProducts = $templatePayload["order"]["products"]["data"];
        if (!empty($orderedProducts)) {
            $orderedProducts = (new EntryTypeService(new \Products(), $requestLanguage))->getMany(["id", "IN", array_column($orderedProducts, "product_id")])["data"];

            $templatePayload["order"]["products"] = array_map(function ($product) use ($templatePayload) {
                // Find previous metadata under order - there is count and product_id
                $orderProductMetadata = $templatePayload["order"]["products"]["data"][array_search($product["id"], array_column($templatePayload["order"]["products"]["data"], "product_id"))];

                return array_merge($orderProductMetadata, ["product" => $product]);
            }, $orderedProducts);
        }

        return $this->container->get(RenderingService::class)->render($response, '@modules:Adcards/pages/objednavky/[order-uuid].twig', $templatePayload);
    }
}