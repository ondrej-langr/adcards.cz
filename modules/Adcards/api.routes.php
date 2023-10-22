<?php

use DrewM\MailChimp\MailChimp;
use PromCMS\Core\Config;
use PromCMS\Core\Mailer;
use PromCMS\Core\Services\RenderingService;
use PromCMS\Core\Services\EntryTypeService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\App;
use PromCMS\Modules\Adcards\Cart;
use Slim\Routing\RouteCollectorProxy;

return function (App $app, RouteCollectorProxy $router) {
    /**
     * @var $container DI\Container;
     */
    $container = $app->getContainer();
    $config = $container->get(Config::class);
    $renderingService = $container->get(RenderingService::class);
    $emailService = $container->get(Mailer::class);
    $cartFromSession = $container->get(Cart::class);

    $router
        ->post('/cart/product/add', function (ServerRequestInterface $request, ResponseInterface $response, $args) use ($renderingService, $cartFromSession) {
            $body = $request->getParsedBody();

            if (!isset($body["product-id"])) {
                $response->withStatus(401);
            }

            $cartFromSession->appendProduct($body["product-id"], $body["quantity"]);

            $renderingService->render($response, '@modules:Adcards/partials/mini-cart.twig', [
                'cartSizeAfterCartUpdate', $cartFromSession->getCount()
            ]);

            return $response->withHeader("Cache-Control", "no-cache");
        })
        ->setName('add-to-cart');

    $router
        ->post('/cart/product/remove', function (ServerRequestInterface $request, ResponseInterface $response, $args) use ($renderingService, $cartFromSession) {
            $body = $request->getParsedBody();

            if (!isset($body["product-id"])) {
                $response->withStatus(401);
            }

            $cartFromSession->removeProduct($body["product-id"]);

            $renderingService->render($response, '@modules:Adcards/partials/mini-cart.twig', [
                'cartSizeAfterCartUpdate', $cartFromSession->getCount()
            ]);

            return $response;
        })
        ->setName('removeFromCart');

    $router
        ->post('/cart/toggle-promo-code', function (ServerRequestInterface $request, ResponseInterface $response, $args) use ($cartFromSession, $renderingService) {
            $body = $request->getParsedBody();

            if (!isset($body["code"])) {
                $response->withStatus(401);
            }

            $userHasPromoCodeAlready = !!$cartFromSession->getPromoCode();
            $template = "@modules:Adcards/partials/pages/cart/right-side/right-side.twig";
            $resultPayload = [
                "state" => [
                    "success" => [],
                    "errors" => [],
                ]
            ];


            if ($userHasPromoCodeAlready) {
                $cartFromSession->deletePromoCode();

                $resultPayload["state"]["success"]["promoCode"] = "Promo kód odebrán";
            } else {
                $successfullyAdded = $cartFromSession->setPromoCode($body["code"]);

                if ($successfullyAdded) {
                    $resultPayload["state"]["success"]["promoCode"] = "Promo kód přidán!";
                } else {
                    $resultPayload["state"]["errors"]["promoCode"] = "Neplatný promo kód!";
                }
            }

            $resultPayload["cart"] = getCartStateForTemplates($cartFromSession);
            $renderingService->render($response, $template, $resultPayload);

            return $response;
        })
        ->setName('toggle-promo-code');

    $router
        ->get('/cart/checkout-order', function (ServerRequestInterface $request, ResponseInterface $response, $args) {
            return $response;
        })
        ->setName('finish-order');

    $router
        ->post('/contact-us/send', function (ServerRequestInterface $request, ResponseInterface $response, $args) use ($config, $renderingService, $emailService) {
            $body = $request->getParsedBody();
            $success = false;

            if (!isset($body["email"]) || !isset($body["name"]) || !isset($body["message"])) {
                $response->withStatus(401);
            }

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

            if ($config->env->development && isset($_ENV['MAILCHIMP_API_KEY'])) {
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
