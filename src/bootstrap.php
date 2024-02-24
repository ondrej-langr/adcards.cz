<?php
// In this file you can tell what this module contains or have here something that should be loaded before your models, routes, ..etc
use Doctrine\ORM\Query;
use PromCMS\App\CartExtras;
use PromCMS\App\Models\MainPageSlides;
use PromCMS\Core\Database\Query\TranslationWalker;
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

    $mailer->setup(
        new \GuzzleHttp\Psr7\Uri($_ENV['MAIL_URI']),
        $_ENV['MAIL_SEND_FROM'],
        'adcards.cz'
    );

    // Special condition - mailtrap does not transfer messages via SSL and thats okay in development
    if (str_contains($_ENV['MAIL_URI'], 'mailtrap')) {
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
        $language = $request->getAttribute('lang');

        $cartRepo = $em->getRepository(\PromCMS\App\Models\Carts::class);
        /** @var \PromCMS\App\Models\Carts|null $cart */
        $cart = $cartRepo->findOneBy([
            'sessionId' => $sessionId
        ]);

        if (!$cart) {
            $cart = new \PromCMS\App\Models\Carts();
            $cart->setSessionId($sessionId);

            $em->persist($cart);
            $em->flush();
        }

        /** @var \PromCMS\App\Models\Carts $cart */
        $cart = $em->createQueryBuilder()
            ->from(\PromCMS\App\Models\Carts::class, 'cart')
            ->select('cart')
            ->where('cart.sessionId = :sessionId')
            ->setParameter(':sessionId', $sessionId)
            ->getQuery()
            ->setHint(Query::HINT_CUSTOM_OUTPUT_WALKER, TranslationWalker::class)
            ->setHint(TranslationWalker::HINT_LOCALE, $language)
            ->getOneOrNullResult();


        // Add cart state into each template (at least to those that render page components, since this variable is only added on request)
        $rendering->getEnvironment()->addGlobal('cartSize', $cart->getCount());

        return $handler->handle($request->withAttribute('cart', $cart));
    };

    $app->add($customApplicationMiddleware);
};