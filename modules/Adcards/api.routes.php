<?php

use DrewM\MailChimp\MailChimp;
use PromCMS\Core\Config;
use PromCMS\Core\Mailer;
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
    $emailService = $container->get(Mailer::class);

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
        ->post('/contact-us/send', function (ServerRequestInterface $request, ResponseInterface $response, $args) use ($config, $renderingService, $emailService) {
            $body = $request->getParsedBody();
            $success = false;

            $emailService->isHtml();
            $emailService->addAddress($body["email"], $body["name"]);
            $emailService->Subject = 'Děkujeme za Vaši zprávu!';
            $emailService->Body = $renderingService->getEnvironment()->render(
                '@modules:Adcards/email/contact-us/user.twig',
                $body,
            );

            $success = $emailService->send();

            $emailService->isHtml();
            $emailService->addAddress($_ENV["MAIL_ADDRESS"] ?? $_ENV["MAIL_USER"]);
            $emailService->Subject = 'Nový kontakt z kontaktního formuláře!';
            $emailService->Body = $renderingService->getEnvironment()->render(
                '@modules:Adcards/email/contact-us/owner.twig',
                $body,
            );

            $success = $emailService->send();

            $renderingService->render($response, '@modules:Adcards/partials/pages/kontakt/form.twig', [
                'success' => $success,
            ]);

            return $response;
        })
        ->setName('contactUsMessage');

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
                $service->delete([['id', '=', $createdItem->id]]);
            }

            $renderingService->render($response, '@modules:Adcards/layouts/site-layout/footer-newsletter-subscribe.twig', [
                'success' => $success,
            ]);

            return $response;
        })
        ->setName('newsletterSubscribe');
};
