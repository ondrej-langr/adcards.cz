<?php

use PromCMS\Core\Services\RenderingService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\App;
use Slim\Routing\RouteCollectorProxy;

return function (App $app, RouteCollectorProxy $router) {
  $router->get('/order', function (
    ServerRequestInterface $request,
    ResponseInterface $response,
    $args,
  ) {

    return $response;
  })->setName("order");

  $router->get('/verify-promo-code', function (
    ServerRequestInterface $request,
    ResponseInterface $response,
    $args,
  ) {

    return $response;
  })->setName("verifyPromoCode");

  $router->get('/promo-code', function (
    ServerRequestInterface $request,
    ResponseInterface $response,
    $args,
  ) {

    return $response;
  })->setName("promoCode");
};