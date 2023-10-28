<?php

use PromCMS\Core\Database\Model;
use PromCMS\Core\Database\SingletonModel;
use PromCMS\Core\Database\ModelResult;

class NewsletterSubscriptions extends Model
{
  protected string $tableName = 'newsletter_subscriptions';
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

    'email' => [
      'title' => 'Email',
      'hide' => false,
      'required' => true,
      'unique' => true,
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
  ];

  static bool $ignoreSeeding = false;

  static string $title = 'Odběry newsletteru';

  static string $modelIcon = 'News';

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
      'hasOrdering' => false,
      'isDraftable' => false,
      'isSharable' => false,
    ];
  }
}
