<?php

namespace PromCMS\Modules\Adcards\Controllers;

use DI\Container;
use PromCMS\Core\Services\EntryTypeService;
use PromCMS\Core\Services\FileService;
use PromCMS\Core\Services\ImageService;
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

    public function get(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $cardMaterialService = new EntryTypeService(new \CardMaterial());
        $countriesService = new EntryTypeService(new \Countries());
        $cardSizesService = new EntryTypeService(new \CardSizes());
        $cardBackgroundsService = new EntryTypeService(new \CardBackgrounds());
        $sportsService = new EntryTypeService(new \Sports());
        $imageService = $this->container->get(ImageService::class);
        $fileService = $this->container->get(FileService::class);

        $payload = [
            "materials" => $cardMaterialService->getMany([], 1, 999)["data"],
            "sizes" => $cardSizesService->getMany([], 1, 999)["data"],
            "countries" => $countriesService->getMany([], 1, 999)["data"],
            "backgrounds" => $cardBackgroundsService->getMany([], 1, 999)["data"],
            "sports" => $sportsService->getMany([], 1, 999)["data"],
        ];

        $materialPublicFields = ["id", "image", "name", "description"];
        $payload["materials"] = array_map(function ($item) use ($materialPublicFields) {
            return array_filter($item, function ($value, $key) use ($materialPublicFields) {
                return in_array($key, $materialPublicFields);
            }, ARRAY_FILTER_USE_BOTH);
        }, $payload["materials"]);

        $sizesPublicFields = ["id", "image", "price", "width", "height"];
        $payload["sizes"] = array_map(function ($item) use ($sizesPublicFields) {
            return array_filter($item, function ($value, $key) use ($sizesPublicFields) {
                return in_array($key, $sizesPublicFields);
            }, ARRAY_FILTER_USE_BOTH);
        }, $payload["sizes"]);

        $countriesPublicFields = ["id", "image"];
        $payload["countries"] = array_map(function ($item) use ($countriesPublicFields) {
            return array_filter($item, function ($value, $key) use ($countriesPublicFields) {
                return in_array($key, $countriesPublicFields);
            }, ARRAY_FILTER_USE_BOTH);
        }, $payload["countries"]);

        $backgroundsPublicFields = ["id", "image", "name", "description", "textColor"];
        $payload["backgrounds"] = array_map(function ($item) use ($backgroundsPublicFields, $imageService, $fileService) {
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

        $payload["builderInitialValues"] = [
            "cardType" => "player",
            "sizeId" => (string)$payload["sizes"][0]["id"],
            "rating" => '99',
            "position" => 'CAM',
            "stats" => array(
                'player' =>
                    array(
                        0 =>
                            array(
                                'name' => 'pac',
                                'value' => 99,
                            ),
                        1 =>
                            array(
                                'name' => 'dri',
                                'value' => 99,
                            ),
                        2 =>
                            array(
                                'name' => 'sho',
                                'value' => 99,
                            ),
                        3 =>
                            array(
                                'name' => 'def',
                                'value' => 99,
                            ),
                        4 =>
                            array(
                                'name' => 'pas',
                                'value' => 99,
                            ),
                        5 =>
                            array(
                                'name' => 'phy',
                                'value' => 99,
                            ),
                    ),
                'goalKeeper' =>
                    array(
                        0 =>
                            array(
                                'name' => 'div',
                                'value' => 99,
                            ),
                        1 =>
                            array(
                                'name' => 'ref',
                                'value' => 99,
                            ),
                        2 =>
                            array(
                                'name' => 'han',
                                'value' => 99,
                            ),
                        3 =>
                            array(
                                'name' => 'spe',
                                'value' => 99,
                            ),
                        4 =>
                            array(
                                'name' => 'kic',
                                'value' => 99,
                            ),
                        5 =>
                            array(
                                'name' => 'pos',
                                'value' => 99,
                            ),
                    ),
            )
        ];

        $queryParams = $request->getQueryParams();
        $sportIds = array_map(fn($item) => $item["id"], $payload["sports"]);
        $materialIds = array_map(fn($item) => $item["id"], $payload["materials"]);
        $backgroundIds = array_map(fn($item) => $item["id"], $payload["backgrounds"]);

        if (isset($queryParams["materialId"]) && in_array(trim($queryParams["materialId"]), $materialIds)) {
            $payload["builderInitialValues"]["materialId"] = trim($queryParams["materialId"]);
        }

        if (isset($queryParams["sportId"]) && in_array(trim($queryParams["sportId"]), $sportIds)) {
            $payload["builderInitialValues"]["sportId"] = trim($queryParams["sportId"]);
        }

        if (isset($queryParams["backgroundId"]) && in_array(trim($queryParams["backgroundId"]), $backgroundIds)) {
            $payload["builderInitialValues"]["backgroundId"] = trim($queryParams["backgroundId"]);
        }

        return $this->container->get(RenderingService::class)->render($response, '@modules:Adcards/pages/builder.twig', $payload);
    }
}