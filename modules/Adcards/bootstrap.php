<?php
// In this file you can tell what this module contains or have here something that should be loaded before your models, routes, ..etc
use PromCMS\Core\Mailer;
use PromCMS\Core\Services\RenderingService;
use PromCMS\Modules\Adcards\Cart;
use PromCMS\Modules\Adcards\CartCard;
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

    CartCard\PlayerImage::$fs = $container->get("filesystem");
    CartCard\ClubImage::$fs = $container->get("filesystem");
    $container->set(Cart::class, new Cart($container));

    if (!empty($_ENV["LOGTAIL_TOKEN"])) {
        $logtailToken = $_ENV["LOGTAIL_TOKEN"];

        $logger = new \Monolog\Logger("adcards.cz");
        $logger->pushHandler(new \Logtail\Monolog\LogtailHandler($logtailToken));

        $container->set(\Monolog\Logger::class, $logger);
    }

    // Is being run after each request
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
