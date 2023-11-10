<?php

use PromCMS\Core\Services\EntryTypeService;
use PromCMS\Core\Services\RenderingService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\App;
use Slim\Routing\RouteCollectorProxy;
use PromCMS\Modules\Adcards\Cart;
use PromCMS\Modules\Adcards\Controllers;

// FIXME: This file is being run twice for some reason - fix this
$runCount = 0;

return function (App $app, RouteCollectorProxy $router) use (&$runCount) {
    $container = $app->getContainer();
    $twig = $container->get(RenderingService::class);

    $router->get('/', function (
        ServerRequestInterface $request,
        ResponseInterface      $response,
                               $args,
    ) use ($twig) {
        $cardMaterialService = new EntryTypeService(new CardMaterial());
        $sliderItemsService = new EntryTypeService(new MainPageSlides());

        return $twig->render($response, '@modules:Adcards/pages/home.twig', [
            "cards" => [
                "materials" => $cardMaterialService->getMany([], 1, 999)["data"],
            ],
            "slider" => [
                "items" => $sliderItemsService->getMany([], 1, 999, ["order" => "desc", "id" => "desc"])["data"]
            ],
        ]);
    });

    $router->get('/karty/builder', Controllers\BuilderController::class . ":get")->setName("builder");
    $router->get('/zeme/vyhledavani', Controllers\BuilderController::class . ":searchCountries")->setName("searchCountries");
    $router->get('/kosik', Controllers\CartController::class . ":get")->setName("cart");
    $router->get('/produkty', Controllers\ProductsController::class . ":get")->setName("products");
    $router->get('/objednavky/{orderUuid}', Controllers\OrdersController::class . ":getOne")->setName("orderPage");

    $router->get('/faq', function (
        ServerRequestInterface $request,
        ResponseInterface      $response,
                               $args,
    ) use ($twig) {

        return $twig->render($response, '@modules:Adcards/pages/faq.twig', [
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
    })->setName("faq");

    $router->get('/kontakt', function (
        ServerRequestInterface $request,
        ResponseInterface      $response,
                               $args,
    ) use ($twig) {

        return $twig->render($response, '@modules:Adcards/pages/kontakt.twig');
    })->setName("contact");

    $router->get('/team', function (
        ServerRequestInterface $request,
        ResponseInterface      $response,
                               $args,
    ) use ($twig) {

        return $twig->render($response, '@modules:Adcards/pages/team.twig');
    })->setName("team");

    if ($runCount == 0) {
        $app->redirect('/obchodni-podminky', '/pdf/trade-agreement.pdf', 301)->setName("trade-agreement");
        $app->redirect('/gdpr', '/pdf/gdpr.pdf', 301)->setName("gdpr");
    }
    $runCount++;
};
