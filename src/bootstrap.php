<?php
// In this file you can tell what this module contains or have here something that should be loaded before your models, routes, ..etc
use PromCMS\Core\Mailer;
use PromCMS\Core\Services\RenderingService;
use PromCMS\App\Cart;
use PromCMS\App\CartCard;
use Slim\App;

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

    $fs = $container->get(\PromCMS\Core\Filesystem::class);
    $cardsFileSystem = $fs->createLocal('cards', \PromCMS\Core\Path::join($container->get('app.root'), 'private', 'cards'));

    CartCard\PlayerImage::$fs = $cardsFileSystem;
    CartCard\ClubImage::$fs = $cardsFileSystem;

    $container->set(Cart::class, new Cart($container));


    if (!empty($_ENV["LOGTAIL_TOKEN"])) {
        $token = $_ENV["LOGTAIL_TOKEN"];
        $container->get(\PromCMS\Core\Logger::class)->pushHandler(new \Logtail\Monolog\LogtailHandler($token));
    }

    // Is being run after each request
    $customApplicationMiddleware = function ($request, $handler) use ($rendering, $container) {
        $session = $container->get(\PromCMS\Core\Session::class);
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