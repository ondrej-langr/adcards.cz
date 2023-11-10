<?php

use PromCMS\Core\Database\Model;
use PromCMS\Core\Database\SingletonModel;
use PromCMS\Core\Database\ModelResult;

class CardSizes extends Model
{
  protected string $tableName = 'card_sizes';
  protected bool $softDelete = false;

  protected bool $timestamps = false;
  protected bool $translations = true;
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

    'width' => [
      'title' => 'Šířka (cm)',
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
      'type' => 'number',
      'autoIncrement' => false,
    ],

    'height' => [
      'title' => 'Výška (cm)',
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
      'type' => 'number',
      'autoIncrement' => false,
    ],

    'price' => [
      'title' => 'Cena',
      'hide' => false,
      'required' => true,
      'unique' => false,
      'editable' => true,
      'translations' => true,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main', 'width' => 12],
      ],
      'readonly' => false,
      'type' => 'number',
      'autoIncrement' => false,
    ],

    'material_id' => [
      'title' => 'Materiál ',
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
      'targetModel' => 'cardMaterial',
      'labelConstructor' => 'name',
      'multiple' => false,
      'fill' => true,
      'foreignKey' => 'id',
    ],

    'image' => [
      'title' => 'Náhledový obrázek',
      'hide' => false,
      'required' => true,
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

    'created_by' => [
      'title' => 'Created by',
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
      'type' => 'relationship',
      'targetModel' => 'user',
      'labelConstructor' => '{{name}}',
      'multiple' => false,
      'fill' => false,
      'foreignKey' => 'id',
    ],

    'updated_by' => [
      'title' => 'Updated by',
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
      'type' => 'relationship',
      'targetModel' => 'user',
      'labelConstructor' => '{{name}}',
      'multiple' => false,
      'fill' => false,
      'foreignKey' => 'id',
    ],
  ];

  static bool $ignoreSeeding = false;

  static string $title = 'Velikost karet';

  static string $modelIcon = 'Dimensions';

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
      'ownable' => true,
      'hasOrdering' => true,
      'isDraftable' => false,
      'isSharable' => false,
    ];
  }
}
