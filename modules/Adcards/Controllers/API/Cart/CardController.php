<?php

namespace PromCMS\Modules\Adcards\Controllers\API\Cart;

use DI\Container;
use PromCMS\Core\Services\RenderingService;
use PromCMS\Modules\Adcards\Cart;
use PromCMS\Modules\Adcards\CartCard;
use PromCMS\Modules\Adcards\StaticMessages;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Routing\RouteContext;
use function PromCMS\Modules\Adcards\Controllers\isDefinedInArray;
use function PromCMS\Modules\Adcards\Controllers\isNotEmpty;

class CardController
{
    private Container $container;

    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    public function addOne(ServerRequestInterface $request, ResponseInterface $response, $args): ResponseInterface
    {
        $cart = $this->container->get(Cart::class);
        $body = $request->getParsedBody();
        $requiredKeys = ["name", "sizeId", "materialId", "backgroundId", "sportId", "cardType"];

        foreach ($requiredKeys as $requiredKey) {
            if (isDefinedInArray($body, $requiredKey) && isNotEmpty($body[$requiredKey])) {
                continue;
            }

            return $response->withStatus(400);
        }

        $card = new CartCard($body["name"], $body["sizeId"], $body["materialId"], $body["backgroundId"], $body["sportId"], $body["cardType"]);

        if ($body["cardType"] !== "realPlayer") {
            $fs = $this->container->get("filesystem");

            $card
                ->setCountry($body["countryId"])
                ->setStats($body["stats"])
                ->setPlayerImage(base64_decode($body["playerImage"]), $this->container->get('session')::id(), uniqid(), $fs)
                ->setRating($body["rating"]);
        }

        if (!$card->isValid()) {
            return $response->withStatus(400);
        }

        $cart->appendCard($card);

        return $this->container->get(RenderingService::class)->render($response, '@modules:Adcards/partials/pages/builder/thank-you.twig', [
            "success" => true,
            "cartSize" => $cart->getCount()
        ]);
    }

    public function removeOneAtIndex(ServerRequestInterface $request, ResponseInterface $response, $args): ResponseInterface
    {
        $cart = $this->container->get(Cart::class);
        $key = "i";
        $queryParams = $request->getQueryParams();

        if (!isset($queryParams[$key])) {
            return $response->withStatus(400);
        }

        $removeAtIndex = $queryParams[$key];
        $cart->removeCard($removeAtIndex);

        $resultPayload = [
            "state" => [
                "successes" => [
                    StaticMessages::CARD_REMOVED_FROM_CART
                ],
                "errors" => [],
            ]
        ];

        $common = getCommonCartTemplateVariables($cart);

        if (empty($common["cart"]["products"]) && empty($common["cart"]["cards"])) {
            return $response->withHeader("HX-Location", "/kosik");
        }

        $this
            ->container
            ->get(RenderingService::class)
            ->render($response, '@modules:Adcards/partials/pages/cart/right-side/right-side.twig',
                array_merge($common, $resultPayload)
            );

        return $response;
    }
}