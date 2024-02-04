const relationFields = [
  {
    name: 'background_id',
    'required': true,
    'translations': false,
    'type': 'relationship',
    'multiple': false,
    'targetModelTableName': 'cardBackgrounds',
    'labelConstructor': '{{name}}',
    'title': 'Pozadí karty',
  },
  {
    name: 'country_id',
    'required': true,
    'translations': false,
    'type': 'relationship',
    'multiple': false,
    'targetModelTableName': 'countries',
    'labelConstructor': '{{name}}',
    'title': 'Země',
  },
  {
    name: 'size_id',
    'required': true,
    'translations': false,
    'type': 'relationship',
    'multiple': false,
    'targetModelTableName': 'cardSizes',
    'labelConstructor': '{{width}}x{{height}}cm',
    'title': 'Velikost',
  },
  {
    name: 'order_id',
    'required': true,
    'translations': false,
    'type': 'relationship',
    'multiple': false,
    'targetModelTableName': 'orders',
    'labelConstructor': '#{{id}} ({{total_cost}} {{currency}})',
    'title': 'Objednávka',
  },
]

/**
 *
 * @type {(typeof import('@prom-cms/schema').databaseConfigModelSchema)['_input']}
 */
const cardsModel = {
  'title': 'Objednané karty',
  'tableName': 'cards',
  admin: {
    icon: 'Id',
  },
  'softDelete': false,
  'timestamp': true,
  'sorting': true,
  'sharable': false,
  'draftable': false,
  'ignoreSeeding': false,
  'ownable': false,
  'intl': false,
  'columns': [
    {
      name: 'player_image',
      'required': false,
      'translations': false,
      'multiple': false,
      'type': 'file',
      'title': 'Obrázek hráče',
      'typeFilter': 'image',
      'admin': {
        'fieldType': 'small-image',
        editor: { width: 6 },
      },
    },
    {
      name: 'club_image_id',
      'required': false,
      'translations': false,
      'multiple': false,
      'type': 'file',
      'title': 'Obrázek klubu',
      'typeFilter': 'image',
      'admin': {
        'fieldType': 'small-image',
        editor: { width: 6 },
      },
    },
    {
      name: 'name',
      'required': true,
      'editable': true,
      'unique': false,
      'hide': false,
      'translations': true,
      'type': 'string',
      'title': 'Název',
    },
    {
      name: 'rating',
      'required': false,
      'editable': true,
      'unique': false,
      'hide': false,
      'translations': false,
      'type': 'number',
      'title': 'Hodnocení',
    },
    {
      name: 'stats',
      'required': false,
      'translations': false,
      'type': 'json',
      'title': 'Stats',
      readonly: true,
      'admin': {
        'fieldType': 'repeater',
        'columns': [
          {
            name: 'name',
            'required': true,
            'type': 'string',
            readonly: true,
          },
          {
            name: 'value',
            'required': true,
            'type': 'string',
            readonly: true,
          },
        ],
      },
    },
    {
      name: 'card_type',
      'required': true,
      'translations': false,
      'type': 'enum',
      'enum': {
        name: 'CardType',
        values: {
          GOAL_KEEPER: 'goalKeeper',
          PLAYER: 'player',
          MANAGER: 'manager',
        },
      },
      'title': 'Typ karty',
    },
    {
      name: 'final_price',
      'required': true,
      'editable': false,
      'unique': false,
      'hide': false,
      'translations': false,
      'type': 'number',
      'title': 'Cena',
      readonly: true,
    },
    {
      name: 'currency',
      'required': true,
      'editable': false,
      'unique': false,
      'hide': false,
      'translations': false,
      'type': 'enum',
      'enum': {
        name: 'Currency',
        values: {
          CZK: 'CZK',
          EUR: 'EUR',
        },
      },
      'title': 'Měna',
      readonly: true,
    },
    ...relationFields,
    {
      name: 'bonuses',
      'required': false,
      'translations': false,
      'type': 'json',
      'title': 'Bonusové informace za příplatek',
      readonly: true,
      'admin': {
        'fieldType': 'repeater',
        'columns': [
          {
            name: 'name',
            'required': true,
            'type': 'string',
            readonly: true,
          },
          {
            name: 'value',
            'required': true,
            'type': 'string',
            title: 'Popisek',
            readonly: true,
          },
          {
            name: 'price',
            'required': true,
            'type': 'number',
            title: 'Cena v Kč',
            readonly: true,
          },
        ],
      },
    },
  ],
}

export default cardsModel