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
      'admin' => ['isHidden' => false, 'editor' => ['placement' => 'main']],
      'type' => 'number',
      'autoIncrement' => true,
    ],

    'playerImage' => [
      'title' => 'Obrázek hráče',
      'hide' => false,
      'required' => false,
      'unique' => false,
      'editable' => true,
      'translations' => false,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main'],
        'fieldType' => 'normal',
      ],
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
        'editor' => ['placement' => 'main'],
        'fieldType' => 'normal',
      ],
      'type' => 'string',
    ],

    'rating' => [
      'title' => 'Hodnocení',
      'hide' => false,
      'required' => true,
      'unique' => false,
      'editable' => true,
      'translations' => false,
      'admin' => ['isHidden' => false, 'editor' => ['placement' => 'main']],
      'type' => 'number',
      'autoIncrement' => false,
    ],

    'background' => [
      'title' => 'Pozadí karty',
      'hide' => false,
      'required' => true,
      'unique' => false,
      'editable' => true,
      'translations' => false,
      'admin' => ['isHidden' => false, 'editor' => ['placement' => 'main']],
      'type' => 'relationship',
      'targetModel' => 'card_backgrounds',
      'labelConstructor' => 'id',
      'multiple' => false,
      'fill' => true,
      'foreignKey' => 'id',
    ],

    'country' => [
      'title' => 'Země',
      'hide' => false,
      'required' => true,
      'unique' => false,
      'editable' => true,
      'translations' => false,
      'admin' => ['isHidden' => false, 'editor' => ['placement' => 'main']],
      'type' => 'relationship',
      'targetModel' => 'countries',
      'labelConstructor' => 'id',
      'multiple' => false,
      'fill' => true,
      'foreignKey' => 'id',
    ],

    'stats' => [
      'title' => 'Stats',
      'hide' => false,
      'required' => true,
      'unique' => false,
      'editable' => true,
      'translations' => false,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main'],
        'fieldType' => 'jsonEditor',
      ],
      'type' => 'json',
    ],

    'cardType' => [
      'title' => 'Typ karty',
      'hide' => false,
      'required' => true,
      'unique' => false,
      'editable' => true,
      'translations' => false,
      'admin' => ['isHidden' => false, 'editor' => ['placement' => 'main']],
      'type' => 'enum',
      'enum' => ['goalKeeper', 'realPlayer', 'player', 'manager'],
    ],

    'size' => [
      'title' => 'Velikost',
      'hide' => false,
      'required' => true,
      'unique' => false,
      'editable' => true,
      'translations' => false,
      'admin' => ['isHidden' => false, 'editor' => ['placement' => 'main']],
      'type' => 'relationship',
      'targetModel' => 'card_sizes',
      'labelConstructor' => 'id',
      'multiple' => false,
      'fill' => true,
      'foreignKey' => 'id',
    ],

    'finalPrice' => [
      'title' => 'Cena',
      'hide' => false,
      'required' => true,
      'unique' => false,
      'editable' => false,
      'translations' => false,
      'admin' => ['isHidden' => false, 'editor' => ['placement' => 'main']],
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
      'admin' => ['isHidden' => false, 'editor' => ['placement' => 'main']],
      'type' => 'enum',
      'enum' => ['CZK', 'EUR'],
    ],

    'madeForSessionId' => [
      'title' => 'Uživatelské session',
      'hide' => true,
      'required' => true,
      'unique' => false,
      'editable' => false,
      'translations' => false,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main'],
        'fieldType' => 'normal',
      ],
      'type' => 'string',
    ],

    'order' => [
      'title' => 'Order',
      'hide' => false,
      'required' => false,
      'unique' => false,
      'editable' => false,
      'translations' => false,
      'admin' => ['isHidden' => true, 'editor' => ['placement' => 'main']],
      'type' => 'number',
      'autoIncrement' => true,
    ],
  ];

  static bool $ignoreSeeding = false;

  static string $title = 'Karty';

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