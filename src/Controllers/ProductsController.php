<?php

namespace PromCMS\App\Controllers;

use DI\Container;
use PromCMS\App\Models\Products;
use PromCMS\Core\Database\EntityManager;
use PromCMS\Core\Http\Routing\AsRoute;
use PromCMS\Core\Services\RenderingService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class ProductsController
{
    #[AsRoute('GET', '/produkty/{productId}', 'productUnderpage')]
    public function getOne(
        ServerRequestInterface $request,
        ResponseInterface      $response,
        EntityManager          $em,
        RenderingService       $rendering,
        string                 $productId,
    ): ResponseInterface
    {
        $productId = intval($productId);
        $item = $em->getRepository(Products::class)->find($productId);

        if (!$item) {
            return $response->withStatus(404);
        }

        return $rendering->render($response, '@app/pages/produkty/[product-id].twig', [
            'product' => $item
        ]);
    }

    #[AsRoute('GET', '/produkty', 'products')]
    public function getMany(ServerRequestInterface $request, ResponseInterface $response, EntityManager $em, RenderingService $renderingService): ResponseInterface
    {
        $items = $em->getRepository(Products::class)->findBy([
            'isBonus' => false
        ]);

        return $renderingService->render($response, '@app/pages/produkty.twig', [
            "products" => $items
        ]);
    }
}