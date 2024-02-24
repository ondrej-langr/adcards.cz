<?php

/**
 * This file is generated by PromCMS, however you can add methods and other logic to this class
 * as this file will be just checked for presence of class in next models sync.
 */
namespace PromCMS\App\Models;

use Doctrine\ORM\Mapping as ORM;
use PromCMS\Core\Database\Models\Mapping as PROM;

#[ORM\Entity, ORM\Table(name: 'promo_codes'), PROM\PromModel(ignoreSeeding: true), ORM\HasLifecycleCallbacks]
class PromoCodes extends Base\PromoCodes
{
  
  function canBeApplied()
  {
    return $this->enabled && $this->getMaxUses() > $this->getUsedTimes();
  }
}