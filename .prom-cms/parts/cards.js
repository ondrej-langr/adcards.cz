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
  'sport_id': {
    'required': true,
    'translations': false,
    'type': 'relationship',
    'multiple': false,
    'targetModel': 'sports',
    'labelConstructor': '{{name}}',
    'title': 'Sport',
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
      },
    },
    'name': {
      'required': true,
      'editable': true,
      'unique': true,
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
    },
    'card_type': {
      'required': true,
      'translations': false,
      'type': 'enum',
      'enum': ['goalKeeper', 'realPlayer', 'player', 'manager'],
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