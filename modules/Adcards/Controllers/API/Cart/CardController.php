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
        $requiredKeys = ["name", "sizeId", "materialId", "backgroundId", "cardType"];

        foreach ($requiredKeys as $requiredKey) {
            if (isDefinedInArray($body, $requiredKey) && isNotEmpty($body[$requiredKey])) {
                continue;
            }

            return $response->withStatus(400);
        }

        $card = new CartCard($body["name"], $body["sizeId"], $body["backgroundId"], $body["cardType"]);

        if ($body["cardType"] !== "realPlayer") {
            $fs = $this->container->get("filesystem");

            $card
                ->setCountry($body["countryId"])
                ->setPlayerImage($body["playerImage"], $this->container->get('session')::id(), uniqid(), $fs)
                ->setRating($body["rating"]);

            if (isset($body["stats"])) {
                $card->setStats($body["stats"]);
            }
        }

        if (!$card->isValid()) {
            return $response->withStatus(400);
        }

        $cart->appendCard($card);

        return $this->container->get(RenderingService::class)->render($response, '@modules:Adcards/partials/pages/builder/thank-you.twig', [
            "success" => true,
            "cartSize" => $cart->getCount(),
            "recommended" => [
                "products" => $cart->getRecommendedProducts()
            ]
        ]);
    }

    public function removeOneAtIndex(ServerRequestInterface $request, ResponseInterface $response, $args): ResponseInterface
    {
        $cart = $this->container->get(Cart::class);
        $key = "i";
        $queryParams = $request->getQueryParams();
        $rendering = $this
            ->container
            ->get(RenderingService::class);

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

        $common = $cart->stateToTemplateVariables();

        if (empty($common["cart"]["products"]) && empty($common["cart"]["cards"])) {
            return $response->withHeader("HX-Location", "/kosik");
        }

        $rendering
            ->render($response, '@modules:Adcards/partials/pages/cart/right-side/right-side.twig',
                array_merge($common, $resultPayload)
            );

        $rendering
            ->render($response, '@modules:Adcards/partials/mini-cart.twig', [
                'cartSize' => $cart->getCount(),
                'oob' => true
            ]);

        return $response;
    }
}