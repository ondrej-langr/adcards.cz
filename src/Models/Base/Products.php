<?php

/**
 * This file is generated by PromCMS, do not edit this file as changes made to this file will be overriden in the next model sync.
 * Updates should be made to ../Products.php as that is not overriden.
 */

namespace PromCMS\App\Models\Base;

use Doctrine\ORM\Mapping as ORM;
use PromCMS\Core\Database\Models\Mapping as PROM;
use Doctrine\Common\Collections\ArrayCollection;
use PromCMS\Core\Database\Models\Abstract\Entity;

#[ORM\MappedSuperclass]
class Products extends Entity
{
  use \PromCMS\Core\Database\Models\Trait\Timestamps;
  use \PromCMS\Core\Database\Models\Trait\Ordable;
  use \PromCMS\Core\Database\Models\Trait\Ownable;
  use \PromCMS\Core\Database\Models\Trait\Draftable;
  use \PromCMS\Core\Database\Models\Trait\NumericId;
  
  #[ORM\Column(name: 'name', nullable: false, unique: true, type: 'string'), PROM\PromModelColumn(title: 'Název', type: 'string', editable: false, hide: false, localized: false)]
  protected ?string $name;
  
  #[ORM\Column(name: 'price', nullable: false, unique: false, type: 'integer'), PROM\PromModelColumn(title: 'Cena', type: 'number', editable: false, hide: false, localized: false)]
  protected ?int $price;
  
  #[ORM\Column(name: 'images_id', nullable: false, unique: false, type: 'integer'), PROM\PromModelColumn(title: 'Obrázky', type: 'file', editable: false, hide: false, localized: false)]
  protected ?\Doctrine\Common\Collections\Collection $images;
  
  #[ORM\Column(name: 'description', nullable: true, unique: false, type: 'text'), PROM\PromModelColumn(title: 'Popisek', type: 'longText', editable: false, hide: false, localized: false)]
  protected ?string $description;
  
  #[ORM\Column(name: 'isbonus', nullable: true, unique: false, type: 'boolean'), PROM\PromModelColumn(title: 'Zvýhodněný produkt ke kartám', type: 'boolean', editable: false, hide: false, localized: false)]
  protected ?bool $isBonus;
  
  function __construct()
  {
    $this->images = new ArrayCollection();
  }
  
  #[ORM\PostLoad]
  function __prom__initCollections()
  {
    $this->images ??= new ArrayCollection();
  }
  
  function getName(): string
  {
    return $this->name;
  }
  
  function setName(string $name): static
  {
    $this->name = $name;
    return $this;
  }
  
  function getPrice(): int
  {
    return $this->price;
  }
  
  function setPrice(int $price): static
  {
    $this->price = $price;
    return $this;
  }
  
  function getImages(): \Doctrine\Common\Collections\Collection
  {
    return $this->images;
  }
  
  function setImages(\Doctrine\Common\Collections\Collection $images): static
  {
    $this->images = $images;
    return $this;
  }
  
  function getDescription(): ?string
  {
    return $this->description;
  }
  
  function setDescription(?string $description): static
  {
    $this->description = $description;
    return $this;
  }
  
  function getIsBonus(): ?bool
  {
    return $this->isBonus;
  }
  
  function setIsBonus(?bool $isBonus): static
  {
    $this->isBonus = $isBonus;
    return $this;
  }
}