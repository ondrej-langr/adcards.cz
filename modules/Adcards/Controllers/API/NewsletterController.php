<?php


namespace PromCMS\Modules\Adcards\Controllers\API;

use DI\Container;
use DrewM\MailChimp\MailChimp;
use PromCMS\Core\Config;
use PromCMS\Core\Services\EntryTypeService;
use PromCMS\Core\Services\RenderingService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class NewsletterController
{
    private Container $container;

    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    public function subscribe(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $body = $request->getParsedBody();
        $config = $this->container->get(Config::class);
        $success = false;
        $service = new EntryTypeService(new \PromoCodes());
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

        $this->container->get(RenderingService::class)->render($response, '@modules:Adcards/layouts/site-layout/footer-newsletter-subscribe.twig', [
            'success' => $success,
        ]);

        return $response;
    }
}