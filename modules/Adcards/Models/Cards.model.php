<?php

use PromCMS\Core\Database\Model;
use PromCMS\Core\Database\SingletonModel;
use PromCMS\Core\Database\ModelResult;

class Cards extends Model
{
  protected string $tableName = 'cards';
  protected bool $softDelete = false;

  protected bool $timestamps = true;
  protected bool $translations = false;
  protected static bool $enabled = true;
  protected static array $adminSettings = ['hidden' => false];

  public static array $casts = [
    'stats' => 'array',
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

    'player_image' => [
      'title' => 'Obrázek hráče',
      'hide' => false,
      'required' => false,
      'unique' => false,
      'editable' => true,
      'translations' => false,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main', 'width' => 12],
        'fieldType' => 'small-image',
      ],
      'readonly' => false,
      'type' => 'file',
      'multiple' => false,
      'typeFilter' => 'image',
    ],

    'name' => [
      'title' => 'Název',
      'hide' => false,
      'required' => true,
      'unique' => true,
      'editable' => true,
      'translations' => true,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main', 'width' => 12],
        'fieldType' => 'normal',
      ],
      'readonly' => false,
      'type' => 'string',
    ],

    'rating' => [
      'title' => 'Hodnocení',
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
      'type' => 'number',
      'autoIncrement' => false,
    ],

    'stats' => [
      'title' => 'Stats',
      'hide' => false,
      'required' => false,
      'unique' => false,
      'editable' => true,
      'translations' => false,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main', 'width' => 12],
        'fieldType' => 'jsonEditor',
      ],
      'readonly' => false,
      'type' => 'json',
    ],

    'card_type' => [
      'title' => 'Typ karty',
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
      'enum' => ['goalKeeper', 'realPlayer', 'player', 'manager'],
    ],

    'final_price' => [
      'title' => 'Cena',
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

    'background_id' => [
      'title' => 'Pozadí karty',
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
      'type' => 'relationship',
      'targetModel' => 'cardBackgrounds',
      'labelConstructor' => '{{name}}',
      'multiple' => false,
      'fill' => true,
      'foreignKey' => 'id',
    ],

    'country_id' => [
      'title' => 'Země',
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
      'type' => 'relationship',
      'targetModel' => 'countries',
      'labelConstructor' => '{{name}}',
      'multiple' => false,
      'fill' => true,
      'foreignKey' => 'id',
    ],

    'sport_id' => [
      'title' => 'Sport',
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
      'type' => 'relationship',
      'targetModel' => 'sports',
      'labelConstructor' => '{{name}}',
      'multiple' => false,
      'fill' => true,
      'foreignKey' => 'id',
    ],

    'size_id' => [
      'title' => 'Velikost',
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
      'type' => 'relationship',
      'targetModel' => 'cardSizes',
      'labelConstructor' => '{{width}}x{{height}}cm',
      'multiple' => false,
      'fill' => true,
      'foreignKey' => 'id',
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

  static string $title = 'Objednané karty';

  static string $modelIcon = 'Id';

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
