<?php
// In this file you can tell what this module contains or have here something that should be loaded before your models, routes, ..etc
use PromCMS\Core\Exceptions\EntityNotFoundException;
use PromCMS\Core\Mailer;
use PromCMS\Core\Services\RenderingService;
use PromCMS\Modules\Adcards\Cart;
use Slim\App;

function getCartStateForTemplates(Cart $cart): array {
    $productsFromCart = $cart->getProducts();
    $promoCode = $cart->getPromoCode();
    $totalWithoutPromo = $cart->getTotal(false);

    return [
        "size" => $cart->getCount(),
        "products" => $productsFromCart,
        "promoCode" => $promoCode ? [
            "isset" => true,
            "value" => $promoCode["code"],
            "percentage" => $promoCode["amount"],
        ] : [
            "isset" => false
        ],
        "total" => [
            // This will be striken through if promocode.isset === true
            "withoutPromo" => $totalWithoutPromo,
            // This is always shown
            "withPromo" => $promoCode ? $cart->getTotal(true) : $totalWithoutPromo
        ]
    ];
}

return function (App $app) {
    /**
     * @var $container DI\Container;
     */
    $container = $app->getContainer();
    $mailer = $container->get(Mailer::class);
    $rendering = $container->get(RenderingService::class);

    // Special condition - mailtrap does not transfer messages via SSL and thats okay in development
    if (str_contains($_ENV['MAIL_HOST'], 'mailtrap')) {
        $mailer->SMTPSecure = false;
    }

    $container->set(Cart::class, new Cart());

    $customApplicationMiddleware = function ($request, $handler) use ($rendering, $container) {
        $session = $container->get('session');
        $cartFromSession = $container->get(Cart::class);

        // Load cart items from session into Cart class instance
        $cartFromSession->setState($session->get('cart', Cart::$defaultState));
        // Add cart state into each template (at least to those that render page components, since this variable is only added on request)
        $rendering->getEnvironment()->addGlobal('cartSize', $cartFromSession->getCount());

        // Handle request or run different middleware
        $response = $handler->handle($request);

        $session->set("cart", $cartFromSession->getState());

        return $response;
    };

    $app->add($customApplicationMiddleware);
};
