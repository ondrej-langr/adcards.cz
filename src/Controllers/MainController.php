<?php
// Here is your basic controller file
namespace PromCMS\App\Controllers;

use Doctrine\ORM\Query;
use PromCMS\App\Models\CardMaterial;
use PromCMS\App\Models\CardSizes;
use PromCMS\App\Models\Faqs;
use PromCMS\App\Models\MainPageSlides;
use PromCMS\Core\Database\EntityManager;
use PromCMS\Core\Database\Query\TranslationWalker;
use PromCMS\Core\Http\Routing\AsRedirectRoute;
use PromCMS\Core\Http\Routing\AsRoute;
use PromCMS\Core\Services\RenderingService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class MainController
{
    #[AsRoute('GET', '/')]
    function mainpage(
        ServerRequestInterface $request,
        ResponseInterface      $response,
        RenderingService       $rendering,
        EntityManager          $em
    ): ResponseInterface
    {
        $currentLanguage = $request->getAttribute('lang');
        $cardMaterialsUnfiltered = $em->createQueryBuilder()
            ->from(CardMaterial::class, 's')
            ->select('s')
            ->getQuery()
            ->setHint(Query::HINT_CUSTOM_OUTPUT_WALKER, TranslationWalker::class)
            ->setHint(TranslationWalker::HINT_LOCALE, $currentLanguage)
            ->getResult();

        $cardMaterials = [];

        foreach ($cardMaterialsUnfiltered as $material) {
            if ($material->getCardSizes()->count()) {
                $cardMaterials[] = $material;
            }
        }

        $sliderItemsQuery = $em->createQueryBuilder()
            ->from(MainPageSlides::class, 'c')
            ->select('c', 'COALESCE(c.order,c.id) as order')
            ->orderBy('order', 'ASC')
            ->getQuery()
            ->setHint(Query::HINT_CUSTOM_OUTPUT_WALKER, TranslationWalker::class)
            ->setHint(TranslationWalker::HINT_LOCALE, $currentLanguage)
            ->getResult();

        $sliderItemsQuery = array_map(fn($item) => $item[0], $sliderItemsQuery);

        return $rendering->render($response, '@app/pages/home.twig', [
            "cards" => [
                "materials" => $cardMaterials,
            ],
            "slider" => [
                "items" => $sliderItemsQuery
            ],
        ]);
    }

    #[AsRoute('GET', '/faq', 'faq')]
    function faq(
        ServerRequestInterface $request,
        ResponseInterface      $response,
        RenderingService       $rendering, EntityManager $em
    ): ResponseInterface
    {
        $currentLanguage = $request->getAttribute('lang');
        $items = $em->createQueryBuilder()
            ->from(Faqs::class, 'f')
            ->select('f', 'COALESCE(f.order,f.id) as order')
            ->orderBy('order', 'ASC')
            ->getQuery()
            ->setHint(Query::HINT_CUSTOM_OUTPUT_WALKER, TranslationWalker::class)
            ->setHint(TranslationWalker::HINT_LOCALE, $currentLanguage)
            ->getResult();

        $items = array_map(fn($item) => $item[0], $items);

        return $rendering->render($response, '@app/pages/faq.twig', [
            "items" => $items
        ]);
    }

    #[AsRoute('GET', '/kontakt', 'contact')]
    function contact(
        ServerRequestInterface $request,
        ResponseInterface      $response,
        RenderingService       $rendering
    ): ResponseInterface
    {
        return $rendering->render($response, '@app/pages/kontakt.twig');
    }

    #[AsRoute('GET', '/team', 'team')]
    function team(
        ServerRequestInterface $request,
        ResponseInterface      $response,
        RenderingService       $rendering
    ): ResponseInterface
    {
        return $rendering->render($response, '@app/pages/team.twig');
    }

    #[AsRedirectRoute('/obchodni-podminky', '/pdf/trade-agreement.pdf', 301, "trade-agreement")]
    function tradeAgreement(
        ServerRequestInterface $request,
        ResponseInterface      $response,
        RenderingService       $rendering
    )
    {
        // empty
    }

    #[AsRedirectRoute('/gdpr', '/pdf/gdpr.pdf', 301, "gdpr")]
    function gdpr(
        ServerRequestInterface $request,
        ResponseInterface      $response,
        RenderingService       $rendering
    )
    {
        // empty
    }
}