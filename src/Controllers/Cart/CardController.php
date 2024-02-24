<?php

namespace PromCMS\App\Controllers\Cart;

use DI\Container;
use PromCMS\App\Models\Base\CardType;
use PromCMS\App\CartCard;
use PromCMS\App\Models\Base\Currency;
use PromCMS\App\Models\CardBackgrounds;
use PromCMS\App\Models\Cards;
use PromCMS\App\Models\CardSizes;
use PromCMS\App\Models\Carts;
use PromCMS\App\Models\Countries;
use PromCMS\App\StaticMessages;
use PromCMS\Core\Database\EntityManager;
use PromCMS\Core\Filesystem;
use PromCMS\Core\Http\Routing\AsApiRoute;
use PromCMS\Core\Services\FileService;
use PromCMS\Core\Services\RenderingService;
use PromCMS\Core\Session;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Psr7\UploadedFile;

class CardController
{
    private Container $container;

    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    private function handleUploadedImage(string $imageBase64, FileService $fileService): UploadedFile
    {
        $allowedMimeTypesToFileType = [];

        foreach ([IMAGETYPE_PNG, IMAGETYPE_GIF, IMAGETYPE_JPEG, IMAGETYPE_WEBP] as $type) {
            $allowedMimeTypesToFileType[image_type_to_mime_type($type)] = $type;
        }
        $allowedMimeTypes = array_keys($allowedMimeTypesToFileType);

        [$uploadedImageMimeType, $imageData] = explode(';', $imageBase64);
        [, $imageData] = explode(',', $imageData);
        [, $uploadedImageMimeType] = explode(':', $uploadedImageMimeType);

        if (!in_array($uploadedImageMimeType, $allowedMimeTypes)) {
            throw new \Exception("Nepodporovaný formát $uploadedImageMimeType obrázku $type. Podporujeme pouze " . implode(", ", $allowedMimeTypes));
        }

        $tempImagePath = tempnam("/tmp", 'card-image-upload');
        file_put_contents($tempImagePath, base64_decode($imageData));
        $mimeTypeAsExtension = image_type_to_extension($allowedMimeTypesToFileType[$uploadedImageMimeType], false);

        return new UploadedFile($tempImagePath, "$type.$mimeTypeAsExtension", $uploadedImageMimeType);
    }

    #[AsApiRoute('POST', '/cart/card/add', 'createNewCard')]
    public function addOne(ServerRequestInterface $request, ResponseInterface $response, EntityManager $em, FileService $fileService, Filesystem $fs): ResponseInterface
    {
        /** @var Carts $cart */
        $cart = $request->getAttribute('cart');
        $body = $request->getParsedBody();
        $requiredKeys = [
            "name",
            "sizeId",
            "backgroundId",
            "cardType"
        ];
        $language = $request->getAttribute('lang');

        $em->beginTransaction();

        try {
            foreach ($requiredKeys as $requiredKey) {
                if (!in_array($requiredKey, array_keys($body)) || empty($body[$requiredKey])) {
                    throw new \Exception("Missing required key $requiredKey ");
                }
            }

            $cardType = CardType::from($body["cardType"]);
            $stats = $body['stats'] ?? [];
            $size = $em->getRepository(CardSizes::class)->find(intval($body["sizeId"]));
            $background = $em->getRepository(CardBackgrounds::class)->find(intval($body["backgroundId"]));
            $country = $em->getRepository(Countries::class)->find(intval($body["countryId"]));

            if (!$cardType || !$size || !$background || !$country) {
                throw new \Exception("Missing size, background or cardType");
            }

            if ($cardType !== CardType::MANAGER && empty($stats)) {
                throw new \Exception("Stats are mandatory for $cardType->value");
            }

            $playerImage = $this->handleUploadedImage($body["playerImage"], $fileService);
            $clubImage = null;

            if (!empty($body["clubImage"])) {
                $clubImage = $this->handleUploadedImage($body['clubImage'], $fileService);
            }

            $timeNow = time();
            $imagesMetadata = [
                'root' => "/Karty/Vytvořené/$timeNow"
            ];

            $newCard = new Cards();

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

                $newCard->setStats([
                    'data' => (new CartCard\PlayerOrGoalKeeperStats($processedStats))->asArray()
                ]);
            }

            $newCard->setSize($size); // Size must be set before bonuses since it iterates over its material bonuses
            if (!empty($body["bonuses"])) {
                $newCard->setBonuses($body['bonuses']);
            }

            $playerImage = $fileService->create($playerImage, $imagesMetadata);
            $clubImage = $clubImage ? $fileService->create($clubImage, $imagesMetadata) : null;

            $newCard
                ->setCart($cart)
                ->setName($body['name'])
                ->setCardType($cardType)
                ->setCountry($country)
                ->setRating(intval($body["rating"]))
                ->setFinalPrice(0)
                ->setPlayerImage($playerImage)
                ->setClubImage($clubImage)
                ->setBackground($background);

            $em->persist($newCard);
            $em->flush();


            $res = $this->container->get(RenderingService::class)->render($response, '@app/partials/pages/builder/thank-you.twig', [
                "success" => true,
                "cartSize" => $cart->getCount(),
                "recommended" => [
                    "products" => $cart->getRecommendedProducts($language)
                ]
            ]);

            $em->getConnection()->commit();

            return $res;
        } catch (\Exception $error) {
            if (isset($playerImage)) {
                $fs->withUploads()->delete($playerImage->getFilePath());

                if (isset($clubImage) && $clubImage) {
                    $fs->withUploads()->delete($clubImage->getFilePath());
                }

                $fs->withUploads()->deleteDirectory(dirname($playerImage->getFilePath()));
            }


            if ($em->getConnection()->isTransactionActive()) {
                $em->getConnection()->rollBack();
            }

            $response->getBody()->write('<pre>' . $error->getTraceAsString() . '</pre>');

            return $response->withStatus(400)->withHeader('X-Custom-Header', $error->getMessage());
        }
    }

    #[AsApiRoute('DELETE', '/cart/card/remove', 'removeCard')]
    public function removeOneAtIndex(ServerRequestInterface $request, ResponseInterface $response, RenderingService $rendering, EntityManager $em, Filesystem $fs, FileService $fileService): ResponseInterface
    {
        /** @var Carts $cart */
        $cart = $request->getAttribute('cart');
        $key = "id";
        $queryParams = $request->getQueryParams();

        if (!isset($queryParams[$key])) {
            return $response->withStatus(400);
        }

        $cardId = intval($queryParams[$key]);

        /**
         * @type Cards|null $foundCard
         */
        $foundCard = null;
        foreach ($cart->getCards() as $card) {
            if ($card->getId() === $cardId) {
                $foundCard = $card;
            }
        }

        if (!$foundCard) {
            return $response->withStatus(404);
        }


        $removeFolderAt = null;
        if ($playerImage = $foundCard->getPlayerImage()) {
            $removeFolderAt = dirname($playerImage->getFilePath());
            $em->remove($playerImage);
        }

        if ($clubImage = $foundCard->getClubImage()) {
            $em->remove($clubImage);
        }

        $cart->updatePickedBonuses($em);

        $em->remove($foundCard);
        $em->flush();

        if ($removeFolderAt) {
            $fs->withUploads()->deleteDirectory($removeFolderAt);
        }

        $resultPayload = [
            'cart' => $cart,
            "state" => [
                "successes" => [
                    StaticMessages::CARD_REMOVED_FROM_CART
                ],
                "errors" => [],
            ]
        ];

        if (empty($cart->getProducts()) && empty($cart->getCards())) {
            return $response->withHeader("HX-Location", "/kosik");
        }

        $rendering
            ->render($response, '@app/partials/pages/cart/right-side/right-side.twig',
                $resultPayload
            );

        $rendering
            ->render($response, '@app/partials/mini-cart.twig', [
                'cartSize' => $cart->getCount(),
                'oob' => true
            ]);

        return $response;
    }
}