<?php


namespace PromCMS\App\Controllers;

use DI\Container;
use PromCMS\Core\Http\Routing\AsApiRoute;
use PromCMS\Core\Mailer;
use PromCMS\Core\Services\RenderingService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class ContactUsController
{
    private Container $container;

    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    #[AsApiRoute('POST', '/contact-us/send', 'contactUsMessage')]
    public function doSend(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $body = $request->getParsedBody();
        $emailService = $this->container->get(Mailer::class);
        $renderingService = $this->container->get(RenderingService::class);
        $success = false;

        if (!isset($body["email"]) || !isset($body["name"]) || !isset($body["message"])) {
            $response->withStatus(401);
        }

        $emailService->isHtml();
        $emailService->addAddress($body["email"], $body["name"]);
        $emailService->Subject = 'Děkujeme za Vaši zprávu!';
        $emailService->Body = $renderingService->getEnvironment()->render(
            '@app/email/contact-us/user.twig',
            $body,
        );

        $success = $emailService->send();

        $emailService->isHtml();
        $emailService->addAddress($_ENV["MAIL_ADDRESS"] ?? $_ENV["MAIL_USER"]);
        $emailService->Subject = 'Nový kontakt z kontaktního formuláře!';
        $emailService->Body = $renderingService->getEnvironment()->render(
            '@app/email/contact-us/owner.twig',
            $body,
        );

        $success = $emailService->send();

        $renderingService->render($response, '@app/partials/pages/kontakt/form.twig', [
            'success' => $success,
        ]);

        return $response;
    }
}