<?php

namespace PromCMS\Modules\Adcards\Controllers;

use DI\Container;
use PromCMS\Core\Services\EntryTypeService;
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

    public function get(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $productsService = new EntryTypeService(new \Products());

        return $this->container->get(RenderingService::class)->render($response, '@modules:Adcards/pages/produkty.twig', [
            "products" => $productsService->getMany([], 1, 999)["data"],
        ]);
    }
}