<?php

use PromCMS\Core\Database\Model;
use PromCMS\Core\Database\SingletonModel;
use PromCMS\Core\Database\ModelResult;

class Products extends Model
{
  protected string $tableName = 'products';
  protected bool $softDelete = false;

  protected bool $timestamps = true;
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

    'name' => [
      'title' => 'Název',
      'hide' => false,
      'required' => true,
      'unique' => true,
      'editable' => true,
      'translations' => true,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main', 'width' => 6],
        'fieldType' => 'heading',
      ],
      'readonly' => false,
      'type' => 'string',
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
        'editor' => ['placement' => 'main', 'width' => 6],
      ],
      'readonly' => false,
      'type' => 'number',
      'autoIncrement' => false,
    ],

    'images' => [
      'title' => 'Obrázky',
      'hide' => false,
      'required' => true,
      'unique' => false,
      'editable' => true,
      'translations' => false,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main', 'width' => 12],
        'fieldType' => 'big-image',
      ],
      'readonly' => false,
      'type' => 'file',
      'multiple' => true,
      'typeFilter' => 'image',
    ],

    'description' => [
      'title' => 'Popisek',
      'hide' => false,
      'required' => false,
      'unique' => false,
      'editable' => true,
      'translations' => true,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main', 'width' => 12],
        'fieldType' => 'normal',
      ],
      'readonly' => false,
      'type' => 'longText',
    ],

    'is_bonus' => [
      'title' => 'Zvýhodněný produkt ke kartám',
      'hide' => false,
      'required' => false,
      'unique' => false,
      'editable' => true,
      'translations' => false,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'aside', 'width' => 12],
      ],
      'readonly' => false,
      'type' => 'boolean',
      'default' => false,
    ],

    'is_published' => [
      'title' => 'Is published',
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
      'type' => 'boolean',
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

  static string $title = 'Produkty';

  static string $modelIcon = 'BadgeTm';

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
      'isDraftable' => true,
      'isSharable' => false,
    ];
  }
}
