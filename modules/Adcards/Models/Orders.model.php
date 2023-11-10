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

  public static array $casts = [
    'cards' => 'array',

    'products' => 'array',
  ];

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
        'editor' => ['placement' => 'main', 'width' => 6],
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
        'editor' => ['placement' => 'main', 'width' => 6],
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
        'editor' => ['placement' => 'main', 'width' => 6],
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
        'editor' => ['placement' => 'main', 'width' => 6],
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
        'editor' => ['placement' => 'main', 'width' => 4],
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
        'editor' => ['placement' => 'main', 'width' => 4],
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
        'editor' => ['placement' => 'main', 'width' => 4],
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
        'editor' => ['placement' => 'main', 'width' => 6],
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
        'editor' => ['placement' => 'main', 'width' => 6],
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
        'editor' => ['placement' => 'aside', 'width' => 12],
      ],
      'readonly' => false,
      'type' => 'enum',
      'enum' => ['CREATED', 'CANCELED', 'PENDING', 'CONFIRMED', 'FINISHED'],
    ],

    'cards' => [
      'title' => 'Karty',
      'hide' => false,
      'required' => false,
      'unique' => false,
      'editable' => true,
      'translations' => false,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main', 'width' => 12],
        'fieldType' => 'repeater',
        'columns' => [
          'card_id' => [
            'hide' => false,
            'required' => true,
            'editable' => true,
            'readonly' => true,
            'type' => 'relationship',
            'targetModel' => 'cards',
            'labelConstructor' => '{{name}} - {{size_id}} - {{final_price}}Kč',
            'multiple' => false,
            'fill' => true,
            'foreignKey' => 'id',
          ],
        ],
      ],
      'readonly' => true,
      'type' => 'json',
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
        'fieldType' => 'repeater',
        'columns' => [
          'product_id' => [
            'hide' => false,
            'required' => true,
            'editable' => true,
            'readonly' => false,
            'type' => 'relationship',
            'targetModel' => 'products',
            'labelConstructor' => '{{name}} ({{id}})',
            'multiple' => false,
            'fill' => true,
            'foreignKey' => 'id',
            'title' => 'Produkt',
          ],
          'count' => [
            'hide' => false,
            'required' => true,
            'editable' => true,
            'readonly' => false,
            'type' => 'number',
            'title' => 'Počet',
          ],
        ],
      ],
      'readonly' => true,
      'type' => 'json',
    ],

    'subtotal_cost' => [
      'title' => 'Mezisoučet',
      'hide' => false,
      'required' => true,
      'unique' => false,
      'editable' => false,
      'translations' => false,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'aside', 'width' => 12],
      ],
      'readonly' => true,
      'type' => 'number',
      'autoIncrement' => false,
    ],

    'promo_code_value' => [
      'title' => 'Slevový kód - název',
      'hide' => false,
      'required' => false,
      'unique' => false,
      'editable' => true,
      'translations' => false,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'aside', 'width' => 6],
        'fieldType' => 'normal',
      ],
      'readonly' => true,
      'type' => 'string',
    ],

    'promo_code_amount' => [
      'title' => 'Slevový kód - hodnota',
      'hide' => false,
      'required' => false,
      'unique' => false,
      'editable' => true,
      'translations' => false,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'aside', 'width' => 6],
      ],
      'readonly' => true,
      'type' => 'number',
      'autoIncrement' => false,
    ],

    'total_cost' => [
      'title' => 'Celková částka',
      'hide' => false,
      'required' => true,
      'unique' => false,
      'editable' => false,
      'translations' => false,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'aside', 'width' => 12],
      ],
      'readonly' => true,
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
      'readonly' => true,
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
