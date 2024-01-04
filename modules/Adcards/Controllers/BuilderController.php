<?php

namespace PromCMS\Modules\Adcards\Controllers;

use DI\Container;
use Monolog\Logger;
use PromCMS\Core\Config;
use PromCMS\Core\Services\EntryTypeService;
use PromCMS\Core\Services\LocalizationService;
use PromCMS\Core\Services\RenderingService;
use PromCMS\Modules\Adcards\CardType;
use PromCMS\Modules\Adcards\CartCard;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

function isDefinedInArray(array $array, $key): bool
{
    if (!isset($array[$key])) {
        return false;
    }

    return true;
}

function isNotEmpty($value): bool
{
    if ($value === null || $value === "") {
        return false;
    }

    return true;
}

class BuilderController
{
    private Container $container;

    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    public function searchCountries(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $countriesService = new EntryTypeService(new \Countries());
        $querySearch = array_merge(["limit" => "15", "page" => "1"], $request->getQueryParams());
        $limit = intval($querySearch["limit"]);
        $page = intval($querySearch["page"]);
        $query = !empty($querySearch["query"]) ? $querySearch["query"] : null;
        $payload = [
            "page" => $page + 1,
            "isSearch" => true
        ];

        $payload["countries"] = $countriesService->getMany(
            $query ? [function ($item) use ($query) {
                return !!preg_match("/$query/i", mb_strtolower($item["name"]));
            }] : [],
            $page,
            $limit
        )["data"];

        return $this->container->get(RenderingService::class)->render($response, '@modules:Adcards/partials/pages/builder/form/countries-list.twig', $payload);
    }

    public function get(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $requestLanguage = $this->container->get(LocalizationService::class)->getCurrentLanguage();
        $logger = $this->container->get(Logger::class);
        $config = $this->container->get(Config::class);

        $payload = [];

        // Materials
        $payload['materials'] = (new \CardMaterial())->query()->setLanguage($requestLanguage)
            ->join(function ($material) use ($requestLanguage, &$payload) {
                $sizes = (new \CardSizes())->query()->setLanguage($requestLanguage)
                    ->where(["material_id", "=", $material["id"]])
                    ->getMany();

                foreach ($sizes as $size) {
                    $payload['sizes'][$size['id']] = $size;
                }

                return $sizes;
            }, "sizes")
            ->select(['sizes'])
            ->getMany();

        $payload['materials'] = array_values(array_filter($payload['materials'], fn($material) => count($material['sizes'] ?? [])));
        $payload['sizes'] = array_values($payload['sizes']);

        // Countries
        $payload['countries'] = \Countries::setLanguage($requestLanguage)
            ->limit(8)
            ->getMany();

        // Backgrounds
        $payload['backgrounds'] = \CardBackgrounds::setLanguage($requestLanguage)
            ->getMany();

        $payload['backgrounds'] = array_map(function ($cardBackground) use ($config) {
            $imageId = $cardBackground['image'];
            $cardBackground['imageSrc'] = $config->app->baseUrl . "/api/entry-types/files/items/$imageId/raw?w=400";

            return $cardBackground;
        }, $payload['backgrounds']);


        $payload['sports'] = \Sports::setLanguage($requestLanguage)
            ->getMany();

        $values = [
            "cardType" => CardType::PLAYER,
            "rating" => '99',
            "position" => 'CAM',
            "stats" => CartCard\PlayerOrGoalKeeperStats::$DEFAULT_VALUES
        ];

        $queryParams = $request->getQueryParams();
        $values["currentStep"] = 0;
        $sportIds = array_column($payload["sports"], "id");
        $materialIds = array_column($payload["materials"], "id");
        $backgroundIds = array_column($payload["backgrounds"], "id");

        // Check if preselected params are valid
        if (isset($queryParams["materialId"]) && in_array(trim($queryParams["materialId"]), $materialIds)) {
            $values["materialId"] = trim($queryParams["materialId"]);

            $foundSizeIndex = array_search(intval($values["materialId"]), array_column($payload["sizes"], "material_id"));

            $values["sizeId"] = (string)$payload["sizes"][$foundSizeIndex]["id"];
            $values["currentStep"] += 1;
        }

        if (isset($queryParams["sportId"]) && in_array(trim($queryParams["sportId"]), $sportIds)) {
            $values["sportId"] = trim($queryParams["sportId"]);
            $values["currentStep"] += 1;
        }

        if (isset($queryParams["backgroundId"]) && in_array(trim($queryParams["backgroundId"]), $backgroundIds)) {
            $values["backgroundId"] = trim($queryParams["backgroundId"]);
            $values["currentStep"] += 1;
        }

        $payload["state"] = [
            "form" => [
                "values" => $values,
                "errors" => [],
                "successes" => [],
            ]
        ];

        return $this->container->get(RenderingService::class)->render($response, '@modules:Adcards/pages/builder.twig', $payload);
    }
}