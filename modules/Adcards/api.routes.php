<?php

use PromCMS\Modules\Adcards\Controllers\API as ApiControllers;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\App;
use Slim\Routing\RouteCollectorProxy;

return function (App $app, RouteCollectorProxy $router) {

    $router
        ->post('/cart/card/add', ApiControllers\Cart\CardController::class . ":addOne")
        ->setName("createNewCard");

    $router
        ->delete('/cartForm/card/remove', ApiControllers\Cart\CardController::class . ":removeOneAtIndex")
        ->setName("removeCardByIndex");

    $router
        ->post('/cart/product/append', ApiControllers\Cart\ProductController::class . ":append")
        ->setName('add-to-cartForm');

    $router
        ->post('/cart/product/update', ApiControllers\Cart\ProductController::class . ":update")
        ->setName('updateProductInCart');

    $router
        ->delete('/cart/product/remove', ApiControllers\Cart\ProductController::class . ":remove")
        ->setName('removeFromCart');

    $router
        ->post('/cart/promo-code/toggle', ApiControllers\Cart\PromoCodeController::class . ":toggle")
        ->setName('toggle-promo-code');

    $router
        ->post('/cart/checkout-order', ApiControllers\CartController::class . ":checkout")
        ->setName('finish-order');

    $router
        ->post('/contact-us/send', ApiControllers\ContactUsController::class . ":send")
        ->setName('contactUsMessage');

    $router
        ->post('/newsletter/subscribe', ApiControllers\NewsletterController::class . ":subscribe")
        ->setName('newsletterSubscribe');
};
