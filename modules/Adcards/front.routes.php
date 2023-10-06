<?php

use PromCMS\Core\Services\RenderingService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\App;
use Slim\Routing\RouteCollectorProxy;

return function (App $app, RouteCollectorProxy $router) {
  $container = $app->getContainer();
  $twig = $container->get(RenderingService::class);

  $router->get('/', function (
    ServerRequestInterface $request,
    ResponseInterface $response,
    $args,
  ) use ($twig) {

    return $twig->render($response, '@modules:Adcards/pages/home.twig');
  });

  $router->get('/karty/builder', function (
    ServerRequestInterface $request,
    ResponseInterface $response,
    $args,
  ) use ($twig) {

    return $twig->render($response, '@modules:Adcards/pages/home.twig');
  })->setName("builder");

  $router->get('/faq', function (
    ServerRequestInterface $request,
    ResponseInterface $response,
    $args,
  ) use ($twig) {

    return $twig->render($response, '@modules:Adcards/pages/faq.twig');
  })->setName("faq");

  $router->get('/kontakt', function (
    ServerRequestInterface $request,
    ResponseInterface $response,
    $args,
  ) use ($twig) {

    return $twig->render($response, '@modules:Adcards/pages/kontakt.twig');
  })->setName("contact");

  $router->get('/kosik', function (
    ServerRequestInterface $request,
    ResponseInterface $response,
    $args,
  ) use ($twig) {

    return $twig->render($response, '@modules:Adcards/pages/kosik.twig');
  })->setName("cart");

  $router->get('/team', function (
    ServerRequestInterface $request,
    ResponseInterface $response,
    $args,
  ) use ($twig) {

    return $twig->render($response, '@modules:Adcards/pages/team.twig');
  })->setName("team");
};
