/**
 *
 * @type {(typeof import('@prom-cms/schema').databaseConfigModelSchema)['_input']}
 */
const cardBackgroundsModel = {
  'title': 'Pozadí karet',
  'softDelete': false,
  'timestamp': true,
  'sorting': true,
  'sharable': false,
  'draftable': true,
  'ignoreSeeding': false,
  'ownable': true,
  'tableName': 'card_backgrounds',
  'intl': true,
  'icon': 'BoxMultiple1',
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
    'textColor': {
      'required': true,
      'editable': true,
      'unique': false,
      'hide': false,
      'translations': true,
      'type': 'json',
      'title': 'Barva textu',
      admin: { fieldType: 'color' },
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
      },
    },
  },
}

export default cardBackgroundsModel