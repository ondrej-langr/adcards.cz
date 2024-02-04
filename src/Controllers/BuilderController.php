<?php

namespace PromCMS\App\Controllers;

use DI\Container;
use PromCMS\App\CardType;
use PromCMS\App\CartCard;
use PromCMS\Core\Config;
use PromCMS\Core\Http\Routing\AsRoute;
use PromCMS\Core\Services\EntryTypeService;
use PromCMS\Core\Services\LocalizationService;
use PromCMS\Core\Services\RenderingService;
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

    #[AsRoute('GET', '/zeme/vyhledavani', 'searchCountries')]
    public function searchCountries(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $countriesService = new EntryTypeService(new \PromCMS\App\Models\Countries());
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

        return $this->container->get(RenderingService::class)->render($response, '@app/partials/pages/builder/form/countries-list.twig', $payload);
    }

    #[AsRoute('GET', '/karty/builder', 'builder')]
    public function get(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $requestLanguage = $this->container->get(LocalizationService::class)->getCurrentLanguage();
        $config = $this->container->get(Config::class);
        $payload = [];

        // Materials
        $payload['materials'] = (new \PromCMS\App\Models\CardMaterial())->query()->setLanguage($requestLanguage)
            ->join(function ($material) use ($requestLanguage, &$payload) {
                $sizes = (new \PromCMS\App\Models\CardSizes())->query()->setLanguage($requestLanguage)
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
        $payload['backgrounds'] = [];

        // Countries
        $payload['countries'] = \PromCMS\App\Models\Countries::setLanguage($requestLanguage)
            ->limit(8)
            ->getMany();

        // Sports and their backgrounds
        $backgroundIds = [];
        $payload['sports'] = (new \PromCMS\App\Models\Sports())->query()->setLanguage($requestLanguage)
            ->join(function ($sport) use ($requestLanguage, &$payload, $config, &$backgroundIds) {
                $backgrounds = (new \PromCMS\App\Models\CardBackgrounds)
                    ->query()
                    ->setLanguage($requestLanguage)
                    ->where(["sport_id", "=", $sport["id"]])
                    ->getMany();

                foreach ($backgrounds as &$background) {
                    $imageId = $background['image'];
                    $background['imageSrc'] = $config->app->baseUrl . "/api/entry-types/files/items/$imageId/raw?w=400";

                    $backgroundIds[] = $background['id'];
                    $payload['backgrounds'][$background['id']] = $background;
                }

                return array_values($backgrounds);
            }, "backgrounds")
            ->select(['backgrounds'])
            ->getMany();
        $backgroundIds = array_unique($backgroundIds);

        // Sports without a background is not a valid sport to select
        $payload['sports'] = array_values(array_filter($payload['sports'], fn($sport) => count($sport['backgrounds']) > 0));
        $payload['backgrounds'] = array_values($payload['backgrounds']);

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

        return $this->container->get(RenderingService::class)->render($response, '@app/pages/builder.twig', $payload);
    }
}