<?php

use DrewM\MailChimp\MailChimp;
use PromCMS\Core\Config;
use PromCMS\Core\Http\ResponseHelper;
use PromCMS\Core\Services\RenderingService;
use PromCMS\Core\Services\EntryTypeService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\App;
use Slim\Routing\RouteCollectorProxy;

return function (App $app, RouteCollectorProxy $router) {
    /**
     * @var DI\Container;
     */
    $container = $app->getContainer();
    $config = $container->get(Config::class);
    /**
     * @var RenderingService
     */
    $renderingService = $container->get(RenderingService::class);

    $router
        ->get('/order/finish', function (ServerRequestInterface $request, ResponseInterface $response, $args) {
            return $response;
        })
        ->setName('finish-order');

    $router
        ->get('/verify-promo-code', function (ServerRequestInterface $request, ResponseInterface $response, $args) {
            return $response;
        })
        ->setName('verifyPromoCode');

    $router
        ->get('/promo-code', function (ServerRequestInterface $request, ResponseInterface $response, $args) {
            return $response;
        })
        ->setName('promoCode');

    $router
        ->post('/newsletter/subscribe', function (ServerRequestInterface $request, ResponseInterface $response, $args) use ($config, $renderingService) {
            $body = $request->getParsedBody();
            $success = false;
            $service = new EntryTypeService(new PromoCodes());
            $payload = [
                'code' => uniqid(8),
                'amount' => 10,
                'enabled' => true,
                'usedTimes' => 0,
                'wasCreatedForNewsletter' => true,
            ];

            $createdItem = $service->create($payload);

            if ($config->env->development) {
                $mailChimp = new MailChimp($_ENV['MAILCHIMP_API_KEY']);
                $result = $mailChimp->post('lists/6ca0ac3cf6/members', [
                    'email_address' => $body['email'],
                    'status' => 'subscribed',
                    'merge_fields' => [
                        'PROMOCODE' => $payload['code'],
                    ],
                ]);
    
                if ($result['status'] !== 400) {
                    $success = true;
                }
            } else {
                $success = !!rand(0, 1);
            }

            if ($success === false) {
                $service->delete([
                    ["id", "=", $createdItem->id]
                ]);
            }

            $renderingService->render($response, "@modules:Adcards/layouts/site-layout/footer-newsletter-subscribe.twig", [
                "success" => $success
            ]);
 
            return $response;
        })
        ->setName('newsletterSubscribe');
};
