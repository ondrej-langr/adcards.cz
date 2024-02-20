<?php

namespace PromCMS\App\Controllers;

use DI\Container;
use PromCMS\App\Models\Products;
use PromCMS\Core\Database\EntityManager;
use PromCMS\Core\Http\Routing\AsRoute;
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
    public function get(ServerRequestInterface $request, ResponseInterface $response, EntityManager $em): ResponseInterface
    {
        $items = $em->getRepository(Products::class)->findBy([
            'isBonus' => false
        ]);

        return $this->container->get(RenderingService::class)->render($response, '@app/pages/produkty.twig', [
            "products" => $items
        ]);
    }
}