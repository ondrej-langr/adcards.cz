<?php

use PromCMS\Core\Database\Model;
use PromCMS\Core\Database\SingletonModel;
use PromCMS\Core\Database\ModelResult;

class Countries extends Model
{
  protected string $tableName = 'countries';
  protected bool $softDelete = false;

  protected bool $timestamps = false;
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
        'fieldType' => 'normal',
      ],
      'readonly' => false,
      'type' => 'string',
    ],

    'flag' => [
      'title' => 'Vlajka',
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
  ];

  static bool $ignoreSeeding = false;

  static string $title = 'Země';

  static string $modelIcon = 'World';

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
