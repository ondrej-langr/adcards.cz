<?php

namespace PromCMS\Modules\Adcards;

use GuzzleHttp\Psr7\UploadedFile;
use JetBrains\PhpStorm\ArrayShape;
use League\Flysystem\Filesystem;
use PromCMS\Core\Services\EntryTypeService;
use PromCMS\Core\Services\FileService;

function getIds(array $array): array
{
    return array_map(fn($row) => $row["id"], $array);
}

class CartCard
{
    private string $name;
    private string $backgroundId;
    private string $sportId;
    private string $sizeId;
    private string $cardType;
    private string|null $countryId = null;
    private array|null $stats = null;
    private string|null $playerImagePathname = null;
    private int|null $rating = null;

    public function __construct(
        string $name,
        string $sizeId,
        string $backgroundId,
        string $sportId,
        string $cardType,
    )
    {
        $this->name = $name;
        $this->sizeId = $sizeId;
        $this->backgroundId = $backgroundId;
        $this->sportId = $sportId;
        $this->cardType = $cardType;
    }

    public function setPlayerImage(string $uploadedPlayerImage, string $sessionId, $fileName, Filesystem $fs): CartCard
    {
        $allowedMimeTypesToFileType = [];
        foreach ([IMAGETYPE_PNG, IMAGETYPE_GIF, IMAGETYPE_JPEG, IMAGETYPE_WEBP] as $type) {
            $allowedMimeTypesToFileType[image_type_to_mime_type($type)] = $type;
        }
        $allowedMimeTypes = array_keys($allowedMimeTypesToFileType);

        [$uploadedImageMimeType, $imageData] = explode(';', $uploadedPlayerImage);
        [, $imageData] = explode(',', $imageData);
        [, $uploadedImageMimeType] = explode(':', $uploadedImageMimeType);

        if (!in_array($uploadedImageMimeType, $allowedMimeTypes)) {
            throw new \Exception("Nepodporovaný formát $uploadedImageMimeType obrázku hráče. Podporujeme pouze " . implode(", ", $allowedMimeTypes));
        }

        $extensionForImage = image_type_to_extension($allowedMimeTypesToFileType[$uploadedImageMimeType], false);
        $filePath = "/temp-uploaded-player-images/$sessionId/$fileName.$extensionForImage";
        $fs->write($filePath, base64_decode($imageData));

        $this->playerImagePathname = $filePath;

        return $this;
    }

    public function setPlayerImagePathname(string $playerImagePathname): CartCard
    {
        $this->playerImagePathname = $playerImagePathname;

        return $this;
    }

    public function setCountry(string $countryId): CartCard
    {
        $this->countryId = $countryId;

        return $this;
    }

    public function setStats(array $stats): CartCard
    {
        if (empty($stats)) {
            throw new \Exception("Prázdné vlastnostni hráče");
        }

        $this->stats = array_map(fn($row) => intval($row), $stats);

        return $this;
    }

    public function setRating(string $rating): CartCard
    {
        $this->rating = intval($rating);

        return $this;
    }

    public function getPrice(): int
    {
        $cardSizesService = new EntryTypeService(new \CardSizes());
        $size = $cardSizesService->getOne(["id", "=", intval($this->sizeId)]);

        return $size->price;
    }

    /**
     * @throws \Exception
     */
    #[ArrayShape(["name" => "string", "background_id" => "string", "sport_id" => "string", "size_id" => "string", "cardType" => "string", "playerImagePathname" => "null|string", "rating" => "int|null", "stats" => "array|null", "country_id" => "null|string"])]
    function asArray(): array
    {
        if (!$this->isValid()) {
            throw new \Exception("Karta není validní");
        }

        return [
            "name" => $this->name,
            "background_id" => $this->backgroundId,
            "sport_id" => $this->sportId,
            "size_id" => $this->sizeId,
            "cardType" => $this->cardType,

            // nullable fields
            "playerImagePathname" => $this->playerImagePathname,
            "rating" => $this->rating,
            "stats" => $this->stats,
            "country_id" => $this->countryId,
        ];
    }


    /**
     * @param $input array{name: string, background_id: string, sport_id: string, size_id: string, cardType: string, playerImagePathname: string|null, rating: string|null, stats: array|null, country_id: string}
     * @return CartCard
     * @throws \Exception
     */
    static function fromArray(array $input): CartCard
    {
        $instance = new self(
            $input["name"],
            $input["size_id"],
            $input["background_id"],
            $input["sport_id"],
            $input["cardType"],
        );

        if ($input["cardType"] !== "realPlayer") {
            $instance
                ->setPlayerImagePathname($input["playerImagePathname"])
                ->setRating($input["rating"])
                ->setCountry($input["country_id"]);

            if (isset($input["stats"])) {
                $instance->setStats($input["stats"]);
            }
        }

        return $instance;
    }

    function isValid(): bool
    {
        $countriesService = new EntryTypeService(new \Countries());
        $cardSizesService = new EntryTypeService(new \CardSizes());
        $cardBackgroundsService = new EntryTypeService(new \CardBackgrounds());
        $sportsService = new EntryTypeService(new \Sports());

        $sizes = $cardSizesService->getMany([], 1, 999)["data"];
        $countries = $countriesService->getMany([], 1, 999)["data"];
        $backgrounds = $cardBackgroundsService->getMany([], 1, 999)["data"];
        $sports = $sportsService->getMany([], 1, 999)["data"];

        // TODO: use json schema for validation
        if (
            !in_array(intval($this->backgroundId), getIds($backgrounds)) ||
            !in_array(intval($this->sportId), getIds($sports)) ||
            !in_array(intval($this->sizeId), getIds($sizes)) ||
            !$this->name
        ) {
            return false;
        }


        if ($this->cardType !== "realPlayer") {
            if (
                !in_array(intval($this->countryId), getIds($countries)) ||
                (empty($this->stats) && $this->cardType !== "manager") ||
                $this->rating === null ||
                !$this->playerImagePathname
            ) {
                return false;
            }
        }

        return true;
    }
}