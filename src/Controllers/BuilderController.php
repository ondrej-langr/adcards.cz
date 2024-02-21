<?php

namespace PromCMS\App\Controllers;

use DI\Container;
use Doctrine\ORM\Query;
use PromCMS\App\CardType;
use PromCMS\App\CartCard;
use PromCMS\App\Models\CardMaterial;
use PromCMS\App\Models\Countries;
use PromCMS\App\Models\MainPageSlides;
use PromCMS\App\Models\Sports;
use PromCMS\Core\Config;
use PromCMS\Core\Database\EntityManager;
use PromCMS\Core\Database\Paginate;
use PromCMS\Core\Database\Query\TranslationWalker;
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
    public function searchCountries(ServerRequestInterface $request, ResponseInterface $response, EntityManager $em): ResponseInterface
    {
        $querySearch = array_merge(["limit" => "15", "page" => "1"], $request->getQueryParams());
        $limit = intval($querySearch["limit"]);
        $page = intval($querySearch["page"]);
        $query = !empty($querySearch["query"]) ? $querySearch["query"] : null;
        $payload = [
            "page" => $page + 1,
            "isSearch" => true
        ];

        $payload["countries"] = Paginate::fromQuery($em->createQueryBuilder(Countries::class, 'c')
            ->where('c.name = :query')
            ->setParameter(':query', "%$query%")
            ->getQuery())->execute($page, $limit)->getItems();

        return $this->container->get(RenderingService::class)->render($response, '@app/partials/pages/builder/form/countries-list.twig', $payload);
    }

    #[AsRoute('GET', '/karty/builder', 'builder')]
    public function get(ServerRequestInterface $request, ResponseInterface $response, EntityManager $em): ResponseInterface
    {
        $requestLanguage = $this->container->get(LocalizationService::class)->getCurrentLanguage();
        $payload = [];

        // Materials
        $unfilteredMaterials = $em->createQueryBuilder()
            ->from(CardMaterial::class, 'm')
            ->select('m')
            ->getQuery()
            ->setHint(Query::HINT_CUSTOM_OUTPUT_WALKER, TranslationWalker::class)
            ->setHint(TranslationWalker::HINT_LOCALE, $requestLanguage)
            ->getResult();

        $materialIds = [];

        $payload['materials'] = [];
        $payload['sizes'] = [];

        /**
         * @type $material CardMaterial
         */
        foreach ($unfilteredMaterials as $material) {
            if (count($sizes = $material->getCardSizes())) {
                $payload['materials'][] = $material;
                $materialIds[$material->getId()] = $material->getId();

                foreach ($sizes as $size) {
                    if (!isset($payload['sizes'][$size->getId()])) {
                        $payload['sizes'][$size->getId()] = $size;
                    }
                }
            }
        }

        $payload['sizes'] = array_values($payload['sizes']);
        $payload['backgrounds'] = [];

        // Countries
        $payload['countries'] = $em->createQueryBuilder()
            ->from(Countries::class, 'c')
            ->select('c')
            ->setMaxResults(8)
            ->getQuery()
            ->getResult();

        // Sports and their backgrounds
        $unfilteredSports = $em->createQueryBuilder()
            ->from(Sports::class, 's')
            ->select('s')
            ->getQuery()
            ->setHint(Query::HINT_CUSTOM_OUTPUT_WALKER, TranslationWalker::class)
            ->setHint(TranslationWalker::HINT_LOCALE, $requestLanguage)
            ->getResult();

        $payload['sports'] = [];
        $sportIds = [];
        $backgroundIds = [];
        foreach ($unfilteredSports as $sport) {
            $cardBackgroundsForSport = $sport->getCardBackgrounds();

            if (!count($cardBackgroundsForSport)) {
                continue;
            }

            foreach ($cardBackgroundsForSport as $bg) {
                $backgroundIds[$bg->getId()] = $bg->getId();
            }

            $sportIds[$sport->getId()] = $sport->getId();
            $payload['sports'][] = $sport;
        }

        $values = [
            "cardType" => CardType::PLAYER,
            "rating" => '99',
            "position" => 'CAM',
            "stats" => CartCard\PlayerOrGoalKeeperStats::$DEFAULT_VALUES
        ];

        $queryParams = $request->getQueryParams();
        $values["currentStep"] = 0;

        // Check if preselected params are valid
        if (isset($queryParams["materialId"]) && in_array(trim($queryParams["materialId"]), $materialIds)) {
            $values["materialId"] = trim($queryParams["materialId"]);

            $foundSizeIndex = array_search(intval($values["materialId"]), array_column($payload["sizes"], "material_id"));

            $values["sizeId"] = $payload["sizes"][$foundSizeIndex]->getId();
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