const relationFields = {
  'background_id': {
    'required': true,
    'translations': false,
    'type': 'relationship',
    'multiple': false,
    'targetModel': 'cardBackgrounds',
    'labelConstructor': '{{name}}',
    'title': 'Pozadí karty',
  },
  'country_id': {
    'required': true,
    'translations': false,
    'type': 'relationship',
    'multiple': false,
    'targetModel': 'countries',
    'labelConstructor': '{{name}}',
    'title': 'Země',
  },
  'size_id': {
    'required': true,
    'translations': false,
    'type': 'relationship',
    'multiple': false,
    'targetModel': 'cardSizes',
    'labelConstructor': '{{width}}x{{height}}cm',
    'title': 'Velikost',
  },
  'order_id': {
    'required': true,
    'translations': false,
    'type': 'relationship',
    'multiple': false,
    'targetModel': 'orders',
    'labelConstructor': '#{{id}} ({{total_cost}} {{currency}})',
    'title': 'Objednávka',
  },
}

/**
 *
 * @type {(typeof import('@prom-cms/schema').databaseConfigModelSchema)['_input']}
 */
const cardsModel = {
  'title': 'Objednané karty',
  'softDelete': false,
  'timestamp': true,
  'sorting': true,
  'sharable': false,
  'draftable': false,
  'ignoreSeeding': false,
  'ownable': false,
  'tableName': 'cards',
  'intl': false,
  'icon': 'Id',
  'columns': {
    'player_image': {
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
    'club_image_id': {
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
    'name': {
      'required': true,
      'editable': true,
      'unique': false,
      'hide': false,
      'translations': true,
      'type': 'string',
      'title': 'Název',
    },
    'rating': {
      'required': false,
      'editable': true,
      'unique': false,
      'hide': false,
      'translations': false,
      'type': 'number',
      'title': 'Hodnocení',
    },
    'stats': {
      'required': false,
      'translations': false,
      'type': 'json',
      'title': 'Stats',
      readonly: true,
      'admin': {
        'fieldType': 'repeater',
        'columns': {
          'name': {
            'required': true,
            'type': 'string',
            readonly: true,
          },
          'value': {
            'required': true,
            'type': 'string',
            readonly: true,
          },
        },
      },
    },
    'card_type': {
      'required': true,
      'translations': false,
      'type': 'enum',
      'enum': ['goalKeeper', 'player', 'manager'],
      'title': 'Typ karty',
    },
    'final_price': {
      'required': true,
      'editable': false,
      'unique': false,
      'hide': false,
      'translations': false,
      'type': 'number',
      'title': 'Cena',
      readonly: true,
    },
    'currency': {
      'required': true,
      'editable': false,
      'unique': false,
      'hide': false,
      'translations': false,
      'type': 'enum',
      'enum': ['CZK', 'EUR'],
      'title': 'Měna',
      readonly: true,
    },
    ...relationFields,
  },
}

export default cardsModel