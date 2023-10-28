const relationFields = {
  'background': {
    'required': true,
    'translations': false,
    'type': 'relationship',
    'multiple': false,
    'targetModel': 'card_backgrounds',
    'labelConstructor': 'name',
    'title': 'Pozadí karty',
  },
  'country': {
    'required': true,
    'translations': false,
    'type': 'relationship',
    'multiple': false,
    'targetModel': 'countries',
    'labelConstructor': 'id',
    'title': 'Země',
  },
  'sport': {
    'required': true,
    'translations': false,
    'type': 'relationship',
    'multiple': false,
    'targetModel': 'sports',
    'labelConstructor': 'name',
    'title': 'Sport',
  },
  'size': {
    'required': true,
    'translations': false,
    'type': 'relationship',
    'multiple': false,
    'targetModel': 'card_sizes',
    'labelConstructor': 'name',
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
    },
    ...relationFields,
  },
}

export default cardsModel