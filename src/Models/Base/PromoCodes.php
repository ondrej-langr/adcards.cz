<?php

/**
 * This file is generated by PromCMS, do not edit this file as changes made to this file will be overriden in the next model sync.
 * Updates should be made to ../PromoCodes.php as that is not overriden.
 */

namespace PromCMS\App\Models\Base;

use Doctrine\ORM\Mapping as ORM;
use PromCMS\Core\Database\Models\Mapping as PROM;
use Doctrine\Common\Collections\ArrayCollection;
use PromCMS\Core\Database\Models\Abstract\Entity;

#[ORM\MappedSuperclass]
class PromoCodes extends Entity
{
  use \PromCMS\Core\Database\Models\Trait\Timestamps;
  use \PromCMS\Core\Database\Models\Trait\Ordable;
  use \PromCMS\Core\Database\Models\Trait\Ownable;
  use \PromCMS\Core\Database\Models\Trait\NumericId;
  
  #[ORM\Column(name: 'code', nullable: false, unique: true, type: 'string'), PROM\PromModelColumn(title: 'Název kódu', type: 'string', editable: false, hide: false, localized: false)]
  protected ?string $code;
  
  #[ORM\Column(name: 'amount', nullable: false, unique: false, type: 'integer'), PROM\PromModelColumn(title: 'Hodnota slevy (%)', type: 'number', editable: false, hide: false, localized: false)]
  protected ?int $amount;
  
  #[ORM\Column(name: 'enabled', nullable: true, unique: false, type: 'boolean'), PROM\PromModelColumn(title: 'Aktivní', type: 'boolean', editable: false, hide: false, localized: false)]
  protected ?bool $enabled;
  
  #[ORM\Column(name: 'maxuses', nullable: false, unique: false, type: 'integer'), PROM\PromModelColumn(title: 'Maximální počet užití', type: 'number', editable: false, hide: false, localized: false)]
  protected ?int $maxUses;
  
  #[ORM\Column(name: 'usedtimes', nullable: true, unique: false, type: 'integer'), PROM\PromModelColumn(title: 'Počet použití', type: 'number', editable: true, hide: false, localized: false)]
  protected ?int $usedTimes;
  
  #[ORM\Column(name: 'wascreatedfornewsletter', nullable: true, unique: false, type: 'boolean'), PROM\PromModelColumn(title: 'Pro newsletter?', type: 'boolean', editable: true, hide: false, localized: false)]
  protected ?bool $wasCreatedForNewsletter;
  /**
  * @var ArrayCollection<int, \PromCMS\App\Models\Carts>
  */
  
  #[ORM\OneToMany(targetEntity: \PromCMS\App\Models\Carts::class, mappedBy: 'promoCode'), PROM\PromModelColumn(title: 'Košíky', type: 'relationship', editable: false, hide: true, localized: false)]
  protected ?\Doctrine\Common\Collections\Collection $carts;
  
  function __construct()
  {
    $this->carts = new ArrayCollection();
  }
  
  #[ORM\PostLoad]
  function __prom__initCollections()
  {
    $this->carts ??= new ArrayCollection();
  }
  
  function getCode(): string
  {
    return $this->code;
  }
  
  function setCode(string $code): static
  {
    $this->code = $code;
    return $this;
  }
  
  function getAmount(): int
  {
    return $this->amount;
  }
  
  function setAmount(int $amount): static
  {
    $this->amount = $amount;
    return $this;
  }
  
  function getEnabled(): ?bool
  {
    return $this->enabled;
  }
  
  function setEnabled(?bool $enabled): static
  {
    $this->enabled = $enabled;
    return $this;
  }
  
  function getMaxUses(): int
  {
    return $this->maxUses;
  }
  
  function setMaxUses(int $maxUses): static
  {
    $this->maxUses = $maxUses;
    return $this;
  }
  
  function getUsedTimes(): ?int
  {
    return $this->usedTimes;
  }
  
  function setUsedTimes(?int $usedTimes): static
  {
    $this->usedTimes = $usedTimes;
    return $this;
  }
  
  function getWasCreatedForNewsletter(): ?bool
  {
    return $this->wasCreatedForNewsletter;
  }
  
  function setWasCreatedForNewsletter(?bool $wasCreatedForNewsletter): static
  {
    $this->wasCreatedForNewsletter = $wasCreatedForNewsletter;
    return $this;
  }
  
  function getCarts(): ?\Doctrine\Common\Collections\Collection
  {
    return $this->carts;
  }
  
  function setCarts(?\Doctrine\Common\Collections\Collection $carts): static
  {
    $this->carts = $carts;
    return $this;
  }
}