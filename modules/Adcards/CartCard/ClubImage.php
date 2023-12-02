<?php

namespace PromCMS\Modules\Adcards\CartCard;

use League\Flysystem\Filesystem;

class ClubImage
{
    static Filesystem $fs;
    private string $imagePathname;

    public function __construct(string $imagePathname)
    {
        $this->imagePathname = $imagePathname;
    }

    function deleteFromStorage()
    {
        self::$fs->delete($this->imagePathname);
    }

    function getPath()
    {
        return $this->imagePathname;
    }

    static function create(string $base64ImageContents, string $sessionId)
    {
        $allowedMimeTypesToFileType = [];
        foreach ([IMAGETYPE_PNG, IMAGETYPE_GIF, IMAGETYPE_JPEG, IMAGETYPE_WEBP] as $type) {
            $allowedMimeTypesToFileType[image_type_to_mime_type($type)] = $type;
        }
        $allowedMimeTypes = array_keys($allowedMimeTypesToFileType);

        [$uploadedImageMimeType, $imageData] = explode(';', $base64ImageContents);
        [, $imageData] = explode(',', $imageData);
        [, $uploadedImageMimeType] = explode(':', $uploadedImageMimeType);

        if (!in_array($uploadedImageMimeType, $allowedMimeTypes)) {
            throw new \Exception("Nepodporovaný formát $uploadedImageMimeType obrázku klubu. Podporujeme pouze " . implode(", ", $allowedMimeTypes));
        }

        $extensionForImage = image_type_to_extension($allowedMimeTypesToFileType[$uploadedImageMimeType], false);
        $fileName = uniqid("klub-");
        $filePath = "/interni/rozpracované-karty/$sessionId/$fileName.$extensionForImage";
        self::$fs->write($filePath, base64_decode($imageData));

        return new self($filePath);
    }
}