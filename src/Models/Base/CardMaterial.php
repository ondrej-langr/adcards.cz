<?php

/**
 * This file is generated by PromCMS, do not edit this file as changes made to this file will be overriden in the next model sync.
 * Updates should be made to ../CardMaterial.php as that is not overriden.
 */

namespace PromCMS\App\Models\Base;

use Doctrine\ORM\Mapping as ORM;
use PromCMS\Core\Database\Models\Mapping as PROM;
use Doctrine\Common\Collections\ArrayCollection;
use PromCMS\Core\Database\Models\Abstract\Entity;

#[ORM\MappedSuperclass]
class CardMaterial extends Entity
{
  use \PromCMS\Core\Database\Models\Trait\Timestamps;
  use \PromCMS\Core\Database\Models\Trait\Ordable;
  use \PromCMS\Core\Database\Models\Trait\Ownable;
  use \PromCMS\Core\Database\Models\Trait\Localized {
    getTranslations as protected getTranslationsOriginal;
  }
  use \PromCMS\Core\Database\Models\Trait\NumericId;
  
  #[ORM\Column(name: 'name', nullable: false, unique: true, type: 'string'), PROM\PromModelColumn(title: 'Název', type: 'string', editable: false, hide: false, localized: true)]
  protected ?string $name;
  
  #[ORM\Column(name: 'description', nullable: false, unique: false, type: 'text'), PROM\PromModelColumn(title: 'Popisek', type: 'longText', editable: false, hide: false, localized: true)]
  protected ?string $description;
  
  #[ORM\ManyToOne(targetEntity: \PromCMS\Core\Database\Models\File::class), ORM\JoinColumn(name: 'image_id', nullable: false, unique: false, referencedColumnName: 'id'), PROM\PromModelColumn(title: 'Obrázek', type: 'file', editable: false, hide: false, localized: false)]
  protected ?\PromCMS\Core\Database\Models\File $image;
  
  #[ORM\Column(name: 'bonuses', nullable: true, unique: false, type: 'array'), PROM\PromModelColumn(title: 'Bonusové informace za příplatek', type: 'json', editable: false, hide: false, localized: false)]
  protected ?array $bonuses;
  /**
  * @var ArrayCollection<int, \PromCMS\App\Models\CardMaterialTranslation>
  */
  
  #[ORM\OneToMany(targetEntity: \PromCMS\App\Models\CardMaterialTranslation::class, mappedBy: 'object', cascade: ['persist', 'remove'])]
  protected $translations;
  
  function __construct()
  {
    $this->translations = new ArrayCollection();
  }
  
  #[ORM\PostLoad]
  function __prom__initCollections()
  {
    $this->translations ??= new ArrayCollection();
  }
  /**
  * @return ArrayCollection<string, \PromCMS\App\Models\CardMaterialTranslation>
  */
  
  function getTranslations(): ArrayCollection
  {
    return $this->getTranslationsOriginal();
  }
  
  function addTranslation(\PromCMS\App\Models\CardMaterialTranslation $translation): static
  {
    if (!$this->translations->contains($translation)) {
      $translation->setObject($this);
      $this->translations->set($translation->getLocale(), $translation);
    }
    return $this;
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
  
  function getDescription(): string
  {
    return $this->description;
  }
  
  function setDescription(string $description): static
  {
    $this->description = $description;
    return $this;
  }
  
  function getImage(): \PromCMS\Core\Database\Models\File
  {
    return $this->image;
  }
  
  function setImage(\PromCMS\Core\Database\Models\File $image): static
  {
    $this->image = $image;
    return $this;
  }
  
  function getBonuses(): ?array
  {
    return $this->bonuses;
  }
  
  function setBonuses(?array $bonuses): static
  {
    $this->bonuses = $bonuses;
    return $this;
  }
}