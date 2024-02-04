<?php

namespace PromCMS\App\Controllers\Cart;

use DI\Container;
use PromCMS\App\Cart;
use PromCMS\App\CartCard;
use PromCMS\App\StaticMessages;
use PromCMS\Core\Http\Routing\AsApiRoute;
use PromCMS\Core\Services\RenderingService;
use PromCMS\Core\Session;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use function PromCMS\Modules\Adcards\Controllers\isDefinedInArray;
use function PromCMS\Modules\Adcards\Controllers\isNotEmpty;

class CardController
{
    private Container $container;

    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    #[AsApiRoute('POST', '/cart/card/add', 'createNewCard')]
    public function addOne(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $cart = $this->container->get(Cart::class);
        $body = $request->getParsedBody();
        $requiredKeys = [
            "name",
            "sizeId",
            "backgroundId",
            "cardType"
        ];

        foreach ($requiredKeys as $requiredKey) {
            if (in_array($requiredKey, $body) && !empty($body[$requiredKey])) {
                continue;
            }

            return $response->withStatus(400);
        }

        $card = new CartCard($body["name"], $body["sizeId"], $body["backgroundId"], $body["cardType"]);

        //if ($body["cardType"] !== "realPlayer") {
        $playerImage = CartCard\PlayerImage::create($body["playerImage"], $this->container->get(Session::class)::id());

        $card
            ->setCountry($body["countryId"])
            ->setPlayerImage($playerImage)
            ->setRating($body["rating"]);

        if (!empty($body["stats"])) {
            // We need to extract stats from client to backend
            $processedStats = [];
            foreach ($body["stats"] as $statKey => $statValue) {
                if (empty($statKey)) {
                    continue;
                }

                $processedStats[] = [
                    "name" => $statKey,
                    'value' => $statValue
                ];
            }

            $card->setStats(new CartCard\PlayerOrGoalKeeperStats($processedStats));
        }

        if (!empty($body["clubImage"])) {
            $card
                ->setClubImage(CartCard\ClubImage::create($body["clubImage"], $this->container->get(Session::class)::id()));
        }
        //}

        if (!empty($body["bonuses"])) {
            $card->setBonuses($body['bonuses']);
        }

        if (!$card->isValid()) {
            return $response->withStatus(400);
        }

        $cart->appendCard($card);

        return $this->container->get(RenderingService::class)->render($response, '@app/partials/pages/builder/thank-you.twig', [
            "success" => true,
            "cartSize" => $cart->getCount(),
            "recommended" => [
                "products" => $cart->getRecommendedProducts()
            ]
        ]);
    }

    #[AsApiRoute('DELETE', '/cart/card/remove', 'removeCardByIndex')]
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
            ->render($response, '@app/partials/pages/cart/right-side/right-side.twig',
                array_merge($common, $resultPayload)
            );

        $rendering
            ->render($response, '@app/partials/mini-cart.twig', [
                'cartSize' => $cart->getCount(),
                'oob' => true
            ]);

        return $response;
    }
}