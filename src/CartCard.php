<?php

namespace PromCMS\App;

use JetBrains\PhpStorm\ArrayShape;
use PromCMS\Core\Services\EntryTypeService;
use PromCMS\App\CartCard\ClubImage;
use PromCMS\App\CartCard\PlayerImage;
use PromCMS\App\CartCard\PlayerOrGoalKeeperStats;

function getIds(array $array): array
{
    return array_map(fn($row) => $row["id"], $array);
}

class CartCard
{
    private string $name;
    private string $backgroundId;
    private string $sizeId;
    private string $cardType;
    private array $bonuses = [];
    private string|null $countryId = null;
    private PlayerOrGoalKeeperStats|null $stats = null;
    private ClubImage|null $clubImage = null;
    private PlayerImage|null $playerImage = null;
    private int|null $rating = null;

    public function __construct(
        string $name,
        string $sizeId,
        string $backgroundId,
        string $cardType,
    )
    {
        $this->name = $name;
        $this->sizeId = $sizeId;
        $this->backgroundId = $backgroundId;
        $this->cardType = $cardType;
    }

    public function getSizeId()
    {
        return intval($this->sizeId);
    }

    /*
     * Handles setting and unsetting player image. When null is passed then player image is destroyed altogether
     */
    public function setPlayerImage(PlayerImage|null $newPlayerImage): CartCard
    {
        if (!empty($this->playerImage) && $newPlayerImage === null) {
            $this->playerImage->deleteFromStorage();
        }

        $this->playerImage = $newPlayerImage;

        return $this;
    }

    /*
     * Handles setting and unsetting club image. When null is passed then club image is destroyed altogether
     */
    public function setClubImage(ClubImage|null $newClubImage): CartCard
    {
        if (!empty($this->clubImage) && $newClubImage === null) {
            $this->clubImage->deleteFromStorage();
        }

        $this->clubImage = $newClubImage;

        return $this;
    }

    public function setCountry(string $countryId): CartCard
    {
        $this->countryId = $countryId;

        return $this;
    }

    public function setStats(PlayerOrGoalKeeperStats $stats): CartCard
    {
        $this->stats = $stats;

        return $this;
    }

    public function setRating(string $rating): CartCard
    {
        $this->rating = intval($rating);

        return $this;
    }

    public function getPrice(): int
    {
        $cardSizesService = new EntryTypeService(new Models\CardSizes());
        $size = $cardSizesService->getOne(["id", "=", intval($this->sizeId)]);

        return $size->price;
    }

    public function setBonuses(array $bonuses)
    {
        $this->bonuses = array_filter($bonuses, fn($bonusValue, $bonusKey) => !empty($bonusKey) && !empty($bonusValue), ARRAY_FILTER_USE_BOTH);

        foreach ($this->bonuses as $bonusKey => $bonus) {
            $this->bonuses[$bonusKey] = htmlspecialchars($bonus);
        }

        return $this;
    }

    public function getBonuses()
    {
        return $this->bonuses;
    }

    /**
     * @throws \Exception
     */
    #[ArrayShape(["name" => "string", "background_id" => "string", "size_id" => "string", "cardType" => "string", "playerImagePathname" => "null|string", "clubImagePathname" => "null|string", "rating" => "int|null", "bonuses" => "array", "stats" => "array|null", "country_id" => "null|string"])]
    function asArray(): array
    {
        if (!$this->isValid()) {
            throw new \Exception("Karta není validní");
        }

        return [
            "name" => $this->name,
            "background_id" => $this->backgroundId,
            "size_id" => $this->sizeId,
            "cardType" => $this->cardType,
            "bonuses" => $this->getBonuses(),

            // nullable fields
            "playerImagePathname" => $this->playerImage ? $this->playerImage->getPath() : null,
            "clubImagePathname" => $this->clubImage ? $this->clubImage->getPath() : null,
            "rating" => $this->rating,
            "stats" => $this->stats ? $this->stats->asArray() : null,
            "country_id" => $this->countryId,
        ];
    }

    /**
     * @param $input array{name: string, background_id: string, size_id: string, cardType: string, playerImagePathname: string|null, clubImagePathname: string|null, rating: string|null, stats: array|null, country_id: string}
     * @return CartCard
     * @throws \Exception
     */
    static function fromArray(array $input): CartCard
    {
        $instance = new self(
            $input["name"],
            $input["size_id"],
            $input["background_id"],
            $input["cardType"],
        );

        $instance
            ->setPlayerImage(new PlayerImage($input["playerImagePathname"]))
            ->setRating($input["rating"])
            ->setCountry($input["country_id"]);

        if (!empty($input["stats"])) {
            $instance->setStats(new PlayerOrGoalKeeperStats($input["stats"]));
        }

        if (!empty($input["clubImagePathname"])) {
            $instance->setClubImage(new ClubImage($input["clubImagePathname"]));
        }

        if (!empty($input['bonuses'])) {
            $instance->setBonuses($input['bonuses']);
        }

        return $instance;
    }

    function isValid(): bool
    {
        try {
            // Check for background
            $cardBackground = (new Models\CardBackgrounds())->query()->getOneById(intval($this->backgroundId));
            // Check for size
            $cardSize = (new Models\CardSizes())->query()->getOneById(intval($this->sizeId));
            // Check for country
            $country = (new Models\Countries())->query()->getOneById(intval($this->countryId));
        } catch (\Exception $error) {
            return false;
        }

        if (
            // Check player type
            !CardType::exists($this->cardType) ||
            // And check if name was provided
            !$this->name ||
            // Everyone (except real player) do have stats
            ($this->cardType !== CardType::MANAGER && empty($this->stats)) ||
            // Check for rating
            $this->rating === null ||
            // And check for image
            !$this->playerImage
        ) {
            return false;
        }

        return true;
    }
}