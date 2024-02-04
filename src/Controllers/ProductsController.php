<?php

namespace PromCMS\App\Controllers;

use DI\Container;
use PromCMS\Core\Config;
use PromCMS\Core\Http\Routing\AsRoute;
use PromCMS\Core\Services\EntryTypeService;
use PromCMS\Core\Services\LocalizationService;
use PromCMS\Core\Services\RenderingService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class ProductsController
{
    private Container $container;

    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    #[AsRoute('GET', '/produkty', 'products')]
    public function get(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $productsService = new EntryTypeService(new \PromCMS\App\Models\Products(), $this->container->get(LocalizationService::class)->getCurrentLanguage());

        return $this->container->get(RenderingService::class)->render($response, '@app/pages/produkty.twig', [
            "products" => $productsService->getMany(["is_bonus", "!=", true], 1, 999)["data"],
        ]);
    }
}