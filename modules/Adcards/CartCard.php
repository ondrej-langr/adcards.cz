<?php

namespace PromCMS\Modules\Adcards;

use GuzzleHttp\Psr7\UploadedFile;

class CartCard {
    private string $name;
    private string $sizeId;
    private string|null $backgroundId = null;
    private string|null $countryId = null;
    private array|null $stats = null;
    private string|null $cardType = null;
    private string|null $playerImagePathname = null;
    private int|null $rating = null;

    public function __construct(string $name, string $sizeId)
    {
        $this->name = $name;
        $this->sizeId = $sizeId;
    }

    public function setPlayerImage(UploadedFile $playerImage) {

    }

    function asArray(): array {
        return [];
    }
}