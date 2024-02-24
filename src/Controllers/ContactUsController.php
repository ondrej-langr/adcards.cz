<?php


namespace PromCMS\App\Controllers;

use DI\Container;
use PromCMS\Core\Http\Routing\AsApiRoute;
use PromCMS\Core\Mailer;
use PromCMS\Core\PromConfig;
use PromCMS\Core\Services\RenderingService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class ContactUsController
{
    #[AsApiRoute('POST', '/contact-us/send', 'contactUsMessage')]
    public function doSend(ServerRequestInterface $request, ResponseInterface $response, Mailer $emailService, RenderingService $renderingService, PromConfig $promConfig): ResponseInterface
    {
        $body = $request->getParsedBody();

        if (!isset($body["email"]) || !isset($body["name"]) || !isset($body["message"])) {
            $response->withStatus(401);
        }

        $userName = $body['name'];
        $userEmail = $body['email'];
        $userMessage = $body['message'];
        $errors = [];

        $emailService->isHtml();
        $emailService->addAddress($body["email"], $body["name"]);
        $emailService->Subject = 'Děkujeme za Vaši zprávu!';
        $emailService->Body = $renderingService->getEnvironment()->render(
            '@app/email/Common.html',
            [
                'baseUrl' => $promConfig->getProject()->url->__toString(),
                'texts' => [
                    'preview' => 'Děkujeme za Váš zájem!',
                    'content' => "
                        <p>Dobrý den $userName,</p>
                        <p>děkujeme za Vaši zprávu na adcards.cz! Již brzo Vás budeme kontaktovat zpět.</p>
                    
                        <p><b>S pozdravem, <br /> Váš adcards.cz<b /></p>
                    "
                ]
            ],
        );

        if (!$emailService->send()) {
            $errors[] = $emailService->ErrorInfo;
        }

        $emailService->isHtml();
        $emailService->addAddress($emailService->From);
        $emailService->Subject = 'Nový kontakt z kontaktního formuláře!';
        $emailService->Body = $renderingService->getEnvironment()->render(
            '@app/email/Common.html',
            [
                'baseUrl' => $promConfig->getProject()->url->__toString(),
                'texts' => [
                    'preview' => 'Děkujeme za Váš zájem!',
                    'content' => "
                        <p>Dobrý den,</p>
                        <p>na stránce adcards.cz byl odeslán kontaktní formulář s těmito údaji:</p>
                    
                        <ul>
                            <li>Jméno: $userName</li>
                            <li>Email: $userEmail</li>
                            <li>Zpráva: $userMessage</li>
                        </ul>
                    
                        <p><b>S pozdravem, <br /> Váš adcards.cz<b /></p>
                    "
                ]
            ],
        );

        if (!$emailService->send()) {
            $errors[] = $emailService->ErrorInfo;
        }

        $renderingService->render($response, '@app/partials/pages/kontakt/form.twig', [
            'success' => !count($errors),
        ]);

        return $response;
    }
}