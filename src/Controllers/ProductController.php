<?php

namespace PromCMS\App\Controllers;

use DI\Container;
use PromCMS\App\Models\Products;
use PromCMS\Core\Database\EntityManager;
use PromCMS\Core\Http\Routing\AsRoute;
use PromCMS\Core\Services\RenderingService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class ProductController
{

    public function __construct(Container $container)
    {
    }

    #[AsRoute('GET', '/produkty/{productId}', 'productUnderpage')]
    public function get(
        ServerRequestInterface $request,
        ResponseInterface      $response,
        EntityManager          $em,
        RenderingService       $rendering,
                               $args
    ): ResponseInterface
    {
        $productId = intval($args["productId"]);
        $item = $em->getRepository(Products::class)->find($productId);

        if (!$item) {
            return $response->withStatus(404);
        }

        return $rendering->render($response, '@app/pages/produkty/[product-id].twig', $item);
    }
}