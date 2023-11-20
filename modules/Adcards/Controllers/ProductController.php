<?php

namespace PromCMS\Modules\Adcards\Controllers;

use DI\Container;
use PromCMS\Core\Services\EntryTypeService;
use PromCMS\Core\Services\LocalizationService;
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

    public function get(ServerRequestInterface $request, ResponseInterface $response, $args): ResponseInterface
    {
        $productId = intval($args["productId"]);

        try {
            $product = (new \Products())
                ->query()
                ->setLanguage($this
                    ->container
                    ->get(LocalizationService::class)->getCurrentLanguage())
                ->where(["id", "=", $productId])
                ->getOne()
                ->getData();
        } catch (\Exception $exception) {
            return $response->withStatus(404);
        }

        return $this
            ->container
            ->get(RenderingService::class)
            ->render($response, '@modules:Adcards/pages/produkty/[product-id].twig', $product);
    }
}