/**
 *
 * @type {(typeof import('@prom-cms/schema').databaseConfigModelSchema)['_input']}
 */
const cardMaterialModel = {
  'title': 'Materiál karet',
  'softDelete': false,
  'timestamp': true,
  'sorting': true,
  'sharable': false,
  'draftable': false,
  'ignoreSeeding': false,
  'ownable': true,
  'tableName': 'card_material',
  'intl': true,
  'icon': 'Cell',
  'columns': {
    'name': {
      'required': true,
      'editable': true,
      'unique': true,
      'hide': false,
      'translations': true,
      'type': 'string',
      'title': 'Název',
      'admin': {
        'fieldType': 'heading',
      },
    },
    'description': {
      'required': true,
      'editable': true,
      'translations': true,
      'type': 'longText',
      'title': 'Popisek',
      admin: {
        editor: {
          width: 6,
        },
      },
    },
    'image': {
      'required': true,
      'editable': true,
      'unique': false,
      'hide': false,
      'translations': false,
      'multiple': false,
      'type': 'file',
      'title': 'Obrázek',
      'typeFilter': 'image',
      'admin': {
        'fieldType': 'big-image',
        editor: {
          width: 6,
        },
      },
    },
    'bonuses': {
      'required': false,
      'translations': false,
      'type': 'json',
      'title': 'Bonusové informace za příplatek',
      'admin': {
        'fieldType': 'repeater',
        'columns': {
          'name': {
            'required': true,
            'type': 'string',
          },
          'price': {
            'required': true,
            'type': 'number',
            title: 'Cena v Kč',
          },
        },
      },
    },
  },
}

export default cardMaterialModel