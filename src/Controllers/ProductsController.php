<?php

namespace PromCMS\App\Controllers;

use Doctrine\ORM\Query;
use PromCMS\App\Models\Products;
use PromCMS\Core\Database\EntityManager;
use PromCMS\Core\Database\Query\TranslationWalker;
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
        $currentLanguage = $request->getAttribute('lang');

        $item = $em->createQueryBuilder()
            ->from(Products::class, 'p')
            ->select('p')
            ->where($em->getExpressionBuilder()->eq('p.id', ':id'))
            ->setParameter(':id', $productId)
            ->getQuery()
            ->setHint(Query::HINT_CUSTOM_OUTPUT_WALKER, TranslationWalker::class)
            ->setHint(TranslationWalker::HINT_LOCALE, $currentLanguage)
            ->getOneOrNullResult();

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
        $currentLanguage = $request->getAttribute('lang');

        $items = $em->createQueryBuilder()
            ->from(Products::class, 'p')
            ->select('p')
            ->addOrderBy('p.order', 'DESC')
            ->addOrderBy('p.id', 'DESC')
            ->where($em->getExpressionBuilder()->eq('p.isBonus', ':isBonus'))
            ->setParameter(':isBonus', false)
            ->getQuery()
            ->setHint(Query::HINT_CUSTOM_OUTPUT_WALKER, TranslationWalker::class)
            ->setHint(TranslationWalker::HINT_LOCALE, $currentLanguage)
            ->getResult();

        return $renderingService->render($response, '@app/pages/produkty.twig', [
            "products" => $items
        ]);
    }
}