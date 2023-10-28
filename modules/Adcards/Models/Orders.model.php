<?php

use PromCMS\Core\Database\Model;
use PromCMS\Core\Database\SingletonModel;
use PromCMS\Core\Database\ModelResult;

class Orders extends Model
{
  protected string $tableName = 'orders';
  protected bool $softDelete = false;

  protected bool $timestamps = true;
  protected bool $translations = false;
  protected static bool $enabled = true;
  protected static array $adminSettings = ['hidden' => false];

  public static array $tableColumns = [
    'id' => [
      'title' => 'ID',
      'hide' => false,
      'required' => false,
      'unique' => true,
      'editable' => false,
      'translations' => false,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main', 'width' => 12],
      ],
      'readonly' => false,
      'type' => 'number',
      'autoIncrement' => true,
    ],

    '_uuid' => [
      'title' => 'Unikátní identifikátor objednávky',
      'hide' => false,
      'required' => true,
      'unique' => false,
      'editable' => false,
      'translations' => false,
      'admin' => [
        'isHidden' => true,
        'editor' => ['placement' => 'main', 'width' => 12],
        'fieldType' => 'normal',
      ],
      'readonly' => false,
      'type' => 'string',
    ],

    'firstName' => [
      'title' => 'Jméno',
      'hide' => false,
      'required' => true,
      'unique' => false,
      'editable' => true,
      'translations' => false,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main', 'width' => 12],
        'fieldType' => 'normal',
      ],
      'readonly' => false,
      'type' => 'string',
    ],

    'lastName' => [
      'title' => 'Příjmení',
      'hide' => false,
      'required' => true,
      'unique' => false,
      'editable' => true,
      'translations' => false,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main', 'width' => 12],
        'fieldType' => 'normal',
      ],
      'readonly' => false,
      'type' => 'string',
    ],

    'email' => [
      'title' => 'Email',
      'hide' => false,
      'required' => true,
      'unique' => false,
      'editable' => true,
      'translations' => false,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main', 'width' => 12],
        'fieldType' => 'normal',
      ],
      'readonly' => false,
      'type' => 'string',
    ],

    'phone' => [
      'title' => 'Telefon',
      'hide' => false,
      'required' => true,
      'unique' => false,
      'editable' => true,
      'translations' => false,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main', 'width' => 12],
        'fieldType' => 'normal',
      ],
      'readonly' => false,
      'type' => 'string',
    ],

    'street' => [
      'title' => 'Ulice',
      'hide' => false,
      'required' => true,
      'unique' => false,
      'editable' => true,
      'translations' => false,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main', 'width' => 12],
        'fieldType' => 'normal',
      ],
      'readonly' => false,
      'type' => 'string',
    ],

    'building_number' => [
      'title' => 'Číslo baráku',
      'hide' => false,
      'required' => true,
      'unique' => false,
      'editable' => true,
      'translations' => false,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main', 'width' => 12],
        'fieldType' => 'normal',
      ],
      'readonly' => false,
      'type' => 'string',
    ],

    'city' => [
      'title' => 'Město',
      'hide' => false,
      'required' => true,
      'unique' => false,
      'editable' => true,
      'translations' => false,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main', 'width' => 12],
        'fieldType' => 'normal',
      ],
      'readonly' => false,
      'type' => 'string',
    ],

    'postal_code' => [
      'title' => 'PSČ',
      'hide' => false,
      'required' => true,
      'unique' => false,
      'editable' => true,
      'translations' => false,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main', 'width' => 12],
        'fieldType' => 'normal',
      ],
      'readonly' => false,
      'type' => 'string',
    ],

    'note' => [
      'title' => 'Note',
      'hide' => false,
      'required' => false,
      'unique' => false,
      'editable' => true,
      'translations' => false,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main', 'width' => 12],
      ],
      'readonly' => false,
      'type' => 'longText',
    ],

    'shipping_method' => [
      'title' => 'Typ dopravy',
      'hide' => false,
      'required' => true,
      'unique' => false,
      'editable' => false,
      'translations' => false,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main', 'width' => 12],
        'fieldType' => 'normal',
      ],
      'readonly' => false,
      'type' => 'string',
    ],

    'payment_method' => [
      'title' => 'Typ platby',
      'hide' => false,
      'required' => true,
      'unique' => false,
      'editable' => false,
      'translations' => false,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main', 'width' => 12],
        'fieldType' => 'normal',
      ],
      'readonly' => false,
      'type' => 'string',
    ],

    'status' => [
      'title' => 'Stav',
      'hide' => false,
      'required' => true,
      'unique' => false,
      'editable' => true,
      'translations' => false,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main', 'width' => 12],
      ],
      'readonly' => false,
      'type' => 'enum',
      'enum' => ['CREATED', 'CANCELED', 'PENDING', 'CONFIRMED', 'FINISHED'],
    ],

    'promo_code' => [
      'title' => 'Slevový kód',
      'hide' => false,
      'required' => false,
      'unique' => false,
      'editable' => true,
      'translations' => false,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main', 'width' => 12],
      ],
      'readonly' => false,
      'type' => 'relationship',
      'targetModel' => 'promo_codes',
      'labelConstructor' => 'id',
      'multiple' => false,
      'fill' => true,
      'foreignKey' => 'id',
    ],

    'cards' => [
      'title' => 'Vytvořené karty',
      'hide' => false,
      'required' => false,
      'unique' => false,
      'editable' => true,
      'translations' => false,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main', 'width' => 12],
      ],
      'readonly' => false,
      'type' => 'relationship',
      'targetModel' => 'cards',
      'labelConstructor' => 'id',
      'multiple' => true,
      'fill' => true,
      'foreignKey' => 'id',
    ],

    'products' => [
      'title' => 'Produkty',
      'hide' => false,
      'required' => false,
      'unique' => false,
      'editable' => true,
      'translations' => false,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main', 'width' => 12],
      ],
      'readonly' => false,
      'type' => 'relationship',
      'targetModel' => 'products',
      'labelConstructor' => 'id',
      'multiple' => true,
      'fill' => true,
      'foreignKey' => 'id',
    ],

    'cost' => [
      'title' => 'Celková částka',
      'hide' => false,
      'required' => true,
      'unique' => false,
      'editable' => false,
      'translations' => false,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main', 'width' => 12],
      ],
      'readonly' => false,
      'type' => 'number',
      'autoIncrement' => false,
    ],

    'currency' => [
      'title' => 'Měna',
      'hide' => false,
      'required' => true,
      'unique' => false,
      'editable' => false,
      'translations' => false,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main', 'width' => 12],
      ],
      'readonly' => false,
      'type' => 'enum',
      'enum' => ['CZK', 'EUR'],
    ],

    'order' => [
      'title' => 'Order',
      'hide' => false,
      'required' => false,
      'unique' => false,
      'editable' => false,
      'translations' => false,
      'admin' => [
        'isHidden' => true,
        'editor' => ['placement' => 'main', 'width' => 12],
      ],
      'readonly' => false,
      'type' => 'number',
      'autoIncrement' => true,
    ],
  ];

  static bool $ignoreSeeding = false;

  static string $title = 'Objednávky';

  static string $modelIcon = 'BuildingStore';

  public static function afterCreate(ModelResult $entry): ModelResult
  {
    $entry->update(['order' => $entry->id]);

    return $entry;
  }

  public function getSummary()
  {
    return (object) [
      'isSingleton' => $this instanceof SingletonModel,
      'tableName' => $this->getTableName(),
      'icon' => self::$modelIcon,
      'title' => isset(self::$title) ? self::$title : null,
      'ignoreSeeding' => self::$ignoreSeeding,
      'columns' => static::$tableColumns,
      'hasTimestamps' => $this->hasTimestamps(),
      'hasSoftDelete' => $this->hasSoftDelete(),
      'admin' => self::$adminSettings,
      'enabled' => self::$enabled,
      'ownable' => false,
      'hasOrdering' => true,
      'isDraftable' => false,
      'isSharable' => false,
    ];
  }
}
