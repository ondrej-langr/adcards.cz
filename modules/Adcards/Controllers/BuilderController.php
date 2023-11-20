<?php

namespace PromCMS\Modules\Adcards\Controllers;

use DI\Container;
use PromCMS\Core\Services\EntryTypeService;
use PromCMS\Core\Services\FileService;
use PromCMS\Core\Services\ImageService;
use PromCMS\Core\Services\LocalizationService;
use PromCMS\Core\Services\RenderingService;
use PromCMS\Modules\Adcards\Cart;
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
            "page" => $page + 1
        ];

        $payload["countries"] = $countriesService->getMany(
            $query ? [["name", "LIKE", "%$query%"]] : [],
            $page,
            $limit
        )["data"];

        return $this->container->get(RenderingService::class)->render($response, '@modules:Adcards/partials/pages/builder/form/countries-list.twig', $payload);
    }

    public function get(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $requestLanguage = $this->container->get(LocalizationService::class)->getCurrentLanguage();
        $cardMaterialService = new EntryTypeService(new \CardMaterial(), $requestLanguage);
        $countriesService = new EntryTypeService(new \Countries(), $requestLanguage);
        $cardSizesService = new EntryTypeService(new \CardSizes(), $requestLanguage);
        $cardBackgroundsService = new EntryTypeService(new \CardBackgrounds(), $requestLanguage);
        $sportsService = new EntryTypeService(new \Sports(), $requestLanguage);
        $imageService = $this->container->get(ImageService::class);
        $fileService = $this->container->get(FileService::class);

        $payload["sizes"] = $cardSizesService->getMany([], 1, 999)["data"];

        $payload = array_merge($payload, [
            "materials" => $cardMaterialService->getMany(
                ["id", "IN", array_unique(array_map(fn($item) => $item["id"], $payload["sizes"]))],
                1,
                999
            )["data"],
            "countries" => $countriesService->getMany([], 1, 15)["data"],
            "backgrounds" => $cardBackgroundsService->getMany([], 1, 999)["data"],
            "sports" => $sportsService->getMany([], 1, 999)["data"],
        ]);

        $sizesPublicFields = ["id", "image", "price", "width", "height", "material_id"];
        $payload["sizes"] = array_map(function ($item) use ($sizesPublicFields) {
            return array_filter($item, function ($value, $key) use ($sizesPublicFields) {
                return in_array($key, $sizesPublicFields);
            }, ARRAY_FILTER_USE_BOTH);
        }, $payload["sizes"]);

        $payload["materials"] = array_map(function ($item) use ($payload) {
            $materialPublicFields = ["id", "image", "name", "description"];
            $filteredContents = array_filter($item, function ($value, $key) use ($materialPublicFields) {
                return in_array($key, $materialPublicFields);
            }, ARRAY_FILTER_USE_BOTH);

            $filteredContents["sizes"] = array_values(array_filter($payload["sizes"], fn($size) => $size["material_id"] === $item["id"]));

            return $filteredContents;
        }, $payload["materials"]);

        $countriesPublicFields = ["id", "flag", "name"];
        $payload["countries"] = array_map(function ($item) use ($countriesPublicFields) {
            return array_filter($item, function ($value, $key) use ($countriesPublicFields) {
                return in_array($key, $countriesPublicFields);
            }, ARRAY_FILTER_USE_BOTH);
        }, $payload["countries"]);

        $payload["backgrounds"] = array_map(function ($item) use ($imageService, $fileService) {
            $backgroundsPublicFields = ["id", "image", "name", "description", "textColor"];
            $backgroundResults = array_filter($item, function ($value, $key) use ($backgroundsPublicFields, $imageService, $fileService) {
                return in_array($key, $backgroundsPublicFields);
            }, ARRAY_FILTER_USE_BOTH);

            $imageInfo = $fileService->getById($backgroundResults["image"]);
            $imageResult = $imageService->getProcessed($imageInfo->getData(), [
                'w' => 400,
            ]);

            $backgroundResults["imageSrc"] = $imageResult["src"];

            return $backgroundResults;
        }, $payload["backgrounds"]);

        $sportsPublicFields = ["id", "image", "name", "description"];
        $payload["sports"] = array_map(function ($item) use ($sportsPublicFields) {
            return array_filter($item, function ($value, $key) use ($sportsPublicFields) {
                return in_array($key, $sportsPublicFields);
            }, ARRAY_FILTER_USE_BOTH);
        }, $payload["sports"]);

        $values = [
            "cardType" => 'player',
            "rating" => '99',
            "position" => 'CAM',
            "stats" => CartCard\PlayerOrGoalKeeperStats::$DEFAULT_VALUES
        ];

        $queryParams = $request->getQueryParams();
        $values["currentStep"] = 0;
        $sportIds = array_column($payload["sports"], "id");
        $materialIds = array_column($payload["materials"], "id");
        $backgroundIds = array_column($payload["backgrounds"], "id");

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