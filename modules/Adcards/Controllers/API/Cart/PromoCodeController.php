<?php

namespace PromCMS\Modules\Adcards\Controllers\API\Cart;

use DI\Container;
use PromCMS\Core\Services\RenderingService;
use PromCMS\Modules\Adcards\Cart;
use PromCMS\Modules\Adcards\StaticMessages;
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
                "successes" => [],
                "errors" => [],
            ]
        ];


        if ($userHasPromoCodeAlready) {
            $cart->deletePromoCode();

            $resultPayload["state"]["successes"][] = StaticMessages::PROMO_CODE_REMOVED;
        } else {
            $successfullyAdded = $cart->setPromoCode($body["code"]);

            if ($successfullyAdded) {
                $resultPayload["state"]["successes"][] = StaticMessages::PROMO_CODE_ADDED;
            } else {
                // In twig we check if "promoCode" is in array - keep this key here, otherview it will be rendered as
                // toast message
                $resultPayload["state"]["errors"]["promoCode"] = StaticMessages::PROMO_CODE_ACTIVATION_FAILED;
            }
        }

        $resultPayload = array_merge($resultPayload, $cart->stateToTemplateVariables());
        $this->container->get(RenderingService::class)->render($response, $template, $resultPayload);

        return $response;
    }
}