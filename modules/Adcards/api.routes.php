<?php

use PromCMS\Modules\Adcards\Controllers;
use Slim\App;
use Slim\Routing\RouteCollectorProxy;

return function (App $app, RouteCollectorProxy $router) {
    $router
        ->post('/cart/card/add', Controllers\Cart\CardController::class . ":addOne")
        ->setName("createNewCard");

    $router
        ->delete('/cart/card/remove', Controllers\Cart\CardController::class . ":removeOneAtIndex")
        ->setName("removeCardByIndex");

    $router
        ->post('/cart/product/append', Controllers\Cart\ProductController::class . ":append")
        ->setName('add-to-cart');

    $router
        ->post('/cart/product/update', Controllers\Cart\ProductController::class . ":update")
        ->setName('updateProductInCart');

    $router
        ->delete('/cart/product/remove', Controllers\Cart\ProductController::class . ":remove")
        ->setName('removeFromCart');

    $router
        ->post('/cart/promo-code/toggle', Controllers\CartController::class . ":doTogglePromoCode_API")
        ->setName('toggle-promo-code');

    $router
        ->post('/cart/checkout-order', Controllers\CartController::class . ":doCheckout_API")
        ->setName('finish-order');

    $router
        ->post('/contact-us/send', Controllers\ContactUsController::class . ":doSend")
        ->setName('contactUsMessage');

    $router
        ->post('/newsletter/subscribe', Controllers\NewsletterController::class . ":subscribe")
        ->setName('newsletterSubscribe');

    // Order

    $router->group("/objednavky/{orderUuid}", function ($orderRouter) {
        $orderRouter
            ->get('/pay/paypal/create', Controllers\OrdersController::class . ":payPalCreatePayment_API")
            ->setName('paypal-create-order');

        $orderRouter
            ->get('/pay/paypal/capture', Controllers\OrdersController::class . ":payPalCapturePayment_API")
            ->setName('paypal-capture-order');
    });
};
