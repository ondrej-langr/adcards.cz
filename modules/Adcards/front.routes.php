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
    $router->post('/karty/builder', Controllers\BuilderController::class . ":post")->setName("createNewCard");
    $router->get('/kosik', Controllers\CartController::class . ":get")->setName("cart");
    $router->get('/produkty', Controllers\ProductsController::class . ":get")->setName("products");

    $router->get('/faq', function (
        ServerRequestInterface $request,
        ResponseInterface      $response,
                               $args,
    ) use ($twig) {

        return $twig->render($response, '@modules:Adcards/pages/faq.twig');
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
