<?php

namespace PromCMS\Modules\Adcards\Controllers\API\Cart;

use DI\Container;
use PromCMS\Core\Services\RenderingService;
use PromCMS\Modules\Adcards\Cart;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class PromoCodeController
{
    private Container $container;

    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    public function toggle(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $cart = $this->container->get(Cart::class);
        $body = $request->getParsedBody();

        if (!isset($body["code"])) {
            $response->withStatus(401);
        }

        $userHasPromoCodeAlready = !!$cart->getPromoCode();
        $template = "@modules:Adcards/partials/pages/cart/right-side/right-side.twig";
        $resultPayload = [
            "state" => [
                "success" => [],
                "errors" => [],
            ]
        ];


        if ($userHasPromoCodeAlready) {
            $cart->deletePromoCode();

            $resultPayload["state"]["success"]["promoCode"] = "Promo kód odebrán";
        } else {
            $successfullyAdded = $cart->setPromoCode($body["code"]);

            if ($successfullyAdded) {
                $resultPayload["state"]["success"]["promoCode"] = "Promo kód přidán!";
            } else {
                $resultPayload["state"]["errors"]["promoCode"] = "Neplatný promo kód!";
            }
        }

        $resultPayload["cart"] = getCartStateForTemplates($cart);
        $this->container->get(RenderingService::class)->render($response, $template, $resultPayload);

        return $response;
    }
}