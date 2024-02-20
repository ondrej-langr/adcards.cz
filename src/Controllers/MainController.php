<?php
// Here is your basic controller file
namespace PromCMS\App\Controllers;

use Doctrine\ORM\Query;
use PromCMS\App\Models\CardMaterial;
use PromCMS\App\Models\CardSizes;
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
            ->select('c')
            ->addOrderBy('c.order', 'DESC')
            ->addOrderBy('c.id', 'DESC')
            ->getQuery()
            ->setHint(Query::HINT_CUSTOM_OUTPUT_WALKER, TranslationWalker::class)
            ->setHint(TranslationWalker::HINT_LOCALE, $currentLanguage)
            ->getResult();

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
        RenderingService       $rendering
    ): ResponseInterface
    {
        return $rendering->render($response, '@app/pages/faq.twig', [
            "items" => [
                [
                    "title" => "Jaké obrázky použít pro co nejlepší kvalitu?",
                    "body" => "<p>Pro co nejlepší kvaltu nahrávejte fotky podle následujících bodů:</p><ul><li><p>Obrázek by měl obsahovat hlavu, ramena a hrudník a vyplňovat co nejvíce místa na</p></li><li><p>Fotografie by měly být pořízené při denním světle, tak, aby nebyla tmavá</p></li><li><p>Vyvarujte se nahrávání fotografií, které jsou staženy ze sociálních sítí,screenshotům a nebo posílány přes komunikační kanály WhatsApp, Facebook atd. – Tytoplatformy snižují kvalitu fotografi</p></li></ul>"
                ],
                [
                    "title" => "Uvidím před odesláním konečný produkt?",
                    "body" => "<p>Po přijmutí objednávky začíná naše grafické studio pracovat na její úpravě. Po dokončení návrhu Vám bude náhled odeslán ke schválení. Pokud do 24 hodin od obdržení zpracovaného náhledu nedáte podměty k jeho úpravě, počítáme s tím, že grafický návrh je v pořádku a předáváme ho k výrobě.</p>"
                ],
                [
                    "title" => "Jak probíhá úprava nahraných obrázků?",
                    "body" => "<p>Po přijetí Vaší objednávky začíná naše grafické studio pracovat na její úpravě. Jedná se zejména o převedení do potřebných formátů, správné posazení obrázku do karty, odstranění pozadí, zaostření a vystínování.</p>"
                ],
                [
                    "title" => "Za jak dlouho mohu kartu očekávat?",
                    "body" => "<p>Od přijetí objednávky můžete Vaši kartu očekávat do 7 pracovních dnů od odeslání objednávky.</p>"
                ],
                [
                    "title" => "Mohu si nechat vytisknout i kartu skutečného hráče?",
                    "body" => "<p>Ano, při vytváření Vaší objednávky zvolíte možnost výroby karty skutečného hráče a pouze nám napíšete jeho jméno. Následně Vám vtvoříme návrh, karty, který Vám zašleme ke schválení</p>"
                ],
                [
                    "title" => "Jak velké jsou karty?",
                    "body" => "<p>Můžete si vybrat karty ze čtyř různých velikostí:</p><ul><li><p>S 19x30 cm</p></li><li><p>M 27x42 cm</p></li><li><p>L 37x59 cm</p></li><li><p>XL 53x84 cm</p></li></ul>"
                ],
                [
                    "title" => "Co když Vám pošlu nekvalitní fotografie?",
                    "body" => "<p>Pokud nám nahrajete nekvalitní fotografie, které by při vytištění byly rozmazané nebo rozostřené, budeme Vás o této skutečnosti informovat a budete mít možnost nám dodat kvalitnější podklady</p>"
                ],
                [
                    "title" => "Mohu zrušit objednávku?",
                    "body" => "<p>Po odeslání objednávky ji již není možné zrušit. Všechny objednávky jsou konečné, jak je uvedeno v našich obchodních podmínkách. Každá karta je unikátní a zpracovává se přesně podle Vašich požadavků.</p>"
                ]
            ],
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