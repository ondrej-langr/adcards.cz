<?php

use PromCMS\Modules\Adcards\Controllers\API as ApiControllers;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\App;
use Slim\Routing\RouteCollectorProxy;

return function (App $app, RouteCollectorProxy $router) {

    $router
        ->post('/cart/product/add', ApiControllers\Cart\ProductController::class . ":add")
        ->setName('add-to-cart');

    $router
        ->post('/cart/product/remove', ApiControllers\Cart\ProductController::class . ":remove")
        ->setName('removeFromCart');

    $router
        ->post('/cart/promo-code/toggle', ApiControllers\Cart\PromoCodeController::class . ":togglePromoCode")
        ->setName('toggle-promo-code');

    $router
        ->get('/cart/checkout-order', ApiControllers\CartController::class . ":checkout")
        ->setName('finish-order');

    $router
        ->post('/contact-us/send', ApiControllers\ContactUsController::class . ":send")
        ->setName('contactUsMessage');

    $router
        ->post('/newsletter/subscribe', ApiControllers\NewsletterController::class . ":subscribe")
        ->setName('newsletterSubscribe');
};
