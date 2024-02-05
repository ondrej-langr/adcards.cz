/**
 *
 * @type {(typeof import('@prom-cms/schema').DatabaseConfigModel)}
 */
const cardBackgroundsModel = {
  'title': 'Pozadí karet',
  'tableName': 'card_backgrounds',
  admin: {
    'icon': 'BoxMultiple1',
  },
  'softDelete': false,
  'timestamp': true,
  'sorting': true,
  'sharable': false,
  'draftable': false,
  'ignoreSeeding': false,
  'ownable': true,
  'intl': true,
  'columns': [
    {
      name: 'name',
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
    {
      name: 'image',
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
    {
      name: 'textColor',
      'required': true,
      'editable': true,
      'unique': false,
      'hide': false,
      'translations': true,
      'type': 'json',
      'title': 'Barva textu',
      admin: { fieldType: 'color' },
    },
    {
      name: 'sport',
      'type': 'relationship',
      'required': true,
      'translations': false,
      'multiple': false,
      'targetModelTableName': 'sports',
      'labelConstructor': '{{name}}',
      'title': 'Sport ',
    },
  ],
}

export default cardBackgroundsModel