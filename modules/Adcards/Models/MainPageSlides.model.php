<?php

use PromCMS\Core\Database\Model;
use PromCMS\Core\Database\SingletonModel;
use PromCMS\Core\Database\ModelResult;

class MainPageSlides extends Model
{
  protected string $tableName = 'main_page_slides';
  protected bool $softDelete = false;

  protected bool $timestamps = true;
  protected bool $translations = true;
  protected bool $enabled = true;
  protected array $adminSettings = ['hidden' => false];

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

    'title' => [
      'title' => 'Titulek',
      'hide' => false,
      'required' => true,
      'unique' => true,
      'editable' => true,
      'translations' => true,
      'admin' => ['isHidden' => false, 'editor' => ['placement' => 'main']],
      'type' => 'longText',
    ],

    'subTitle' => [
      'title' => 'Subtitulek',
      'hide' => false,
      'required' => false,
      'unique' => false,
      'editable' => true,
      'translations' => true,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main'],
        'fieldType' => 'normal',
      ],
      'type' => 'string',
    ],

    'buttonUrl' => [
      'title' => 'Odkaz pro tlačítko',
      'hide' => false,
      'required' => false,
      'unique' => false,
      'editable' => true,
      'translations' => true,
      'admin' => [
        'isHidden' => false,
        'editor' => ['placement' => 'main'],
        'fieldType' => 'normal',
      ],
      'type' => 'string',
    ],

    'image' => [
      'title' => 'Obrázek',
      'hide' => false,
      'required' => true,
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

    'created_by' => [
      'title' => 'Created by',
      'hide' => false,
      'required' => false,
      'unique' => false,
      'editable' => false,
      'translations' => false,
      'admin' => ['isHidden' => true, 'editor' => ['placement' => 'main']],
      'type' => 'relationship',
      'targetModel' => 'user',
      'labelConstructor' => 'name',
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
      'admin' => ['isHidden' => true, 'editor' => ['placement' => 'main']],
      'type' => 'relationship',
      'targetModel' => 'user',
      'labelConstructor' => 'name',
      'multiple' => false,
      'fill' => false,
      'foreignKey' => 'id',
    ],
  ];

  static bool $ignoreSeeding = false;

  static string $title = 'Slider Položky';

  static string $modelIcon = 'Slideshow';

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
      'hasOrdering' => false,
      'isDraftable' => false,
      'isSharable' => false,
    ];
  }
}
