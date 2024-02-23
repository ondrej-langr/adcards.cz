<?php
// In this file you can tell what this module contains or have here something that should be loaded before your models, routes, ..etc
use PromCMS\App\CartExtras;
use PromCMS\Core\Mailer;
use PromCMS\Core\Services\RenderingService;
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
    $em = $container->get(\PromCMS\Core\Database\EntityManager::class);

    CartCard\PlayerImage::$fs = $cardsFileSystem;
    CartCard\ClubImage::$fs = $cardsFileSystem;
    CartExtras::$em = $em;

    if (!empty($_ENV["LOGTAIL_TOKEN"])) {
        $token = $_ENV["LOGTAIL_TOKEN"];
        $container->get(\PromCMS\Core\Logger::class)->pushHandler(new \Logtail\Monolog\LogtailHandler($token));
    }

    // Is being run after each request
    $customApplicationMiddleware = function ($request, $handler) use ($rendering, $container, $em) {
        $session = $container->get(\PromCMS\Core\Session::class);
        $sessionId = $session::id();

        $cartRepo = $em->getRepository(\PromCMS\App\Models\Carts::class);
        $cart = $cartRepo->findOneBy([
            'sessionId' => $sessionId
        ]);

        if (!$cart) {
            $cart = new \PromCMS\App\Models\Carts();
            $cart->setSessionId($sessionId);

            $em->persist($cart);
            $em->flush();
        }

        // Add cart state into each template (at least to those that render page components, since this variable is only added on request)
        $rendering->getEnvironment()->addGlobal('cartSize', $cart->getCount());

        return $handler->handle($request->withAttribute('cart', $cart));
    };

    $app->add($customApplicationMiddleware);
};