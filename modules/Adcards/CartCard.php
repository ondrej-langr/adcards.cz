<?php

namespace PromCMS\Modules\Adcards;

use GuzzleHttp\Psr7\UploadedFile;
use PromCMS\Core\Services\EntryTypeService;

function getIds(array $array)
{
    return array_map(fn($row) => $row["id"], $array);
}

class CartCard
{
    private string $name;
    private string $backgroundId;
    private string $sportId;
    private string $materialId;
    private string|null $sizeId = null;
    private string|null $countryId = null;
    private array|null $stats = null;
    private string|null $cardType = null;
    private string|null $playerImagePathname = null;
    private int|null $rating = null;

    public function __construct(
        string $name,
        string $materialId,
        string $backgroundId,
        string $sportId,
    )
    {
        $this->name = $name;
        $this->materialId = $materialId;
        $this->backgroundId = $backgroundId;
        $this->sportId = $sportId;
    }

    public function setPlayerImage(UploadedFile $playerImage)
    {

    }

    public function setSize(string $sizeId)
    {
        $this->sizeId = $sizeId;
    }

    public function setCountry(string $countryId)
    {
        $this->countryId = $countryId;
    }

    public function setStats(array $stats)
    {
        $this->stats = $stats;
    }

    public function setRating(string $rating)
    {
        $this->rating = $rating;
    }

    function asArray(): array
    {
        return [];
    }

    function isValid(): bool
    {
        $cardMaterialService = new EntryTypeService(new \CardMaterial());
        $countriesService = new EntryTypeService(new \Countries());
        $cardSizesService = new EntryTypeService(new \CardSizes());
        $cardBackgroundsService = new EntryTypeService(new \CardBackgrounds());
        $sportsService = new EntryTypeService(new \Sports());

        $materials = $cardMaterialService->getMany([], 1, 999)["data"];
        $sizes = $cardSizesService->getMany([], 1, 999)["data"];
        $countries = $countriesService->getMany([], 1, 999)["data"];
        $backgrounds = $cardBackgroundsService->getMany([], 1, 999)["data"];
        $sports = $sportsService->getMany([], 1, 999)["data"];

        // TODO: use json schema for validation
        if (
            !in_array(intval($this->materialId), getIds($materials)) ||
            !in_array(intval($this->backgroundId), getIds($backgrounds)) ||
            !in_array(intval($this->sportId), getIds($sports)) ||
            !$this->name
        ) {
            return false;
        }


        if ($this->cardType !== "realPlayer" && $this->cardType !== null) {
            if (
                !in_array(intval($this->sizeId), getIds($sizes)) ||
                !in_array(intval($this->countryId), getIds($countries)) ||
                $this->stats === null || count($this->stats) == 0 || $this->rating === null || !$this->playerImagePathname
            ) {
                return false;
            }
        }

        return true;
    }
}