/**
 *
 * @type {(typeof import('@prom-cms/schema').databaseConfigModelSchema)['_input']}
 */
const cardSizesModel = {
  'title': 'Velikost karet',
  'tableName': 'card_sizes',
  admin: {
    icon: 'Dimensions',
  },
  'softDelete': false,
  'timestamp': false,
  'sorting': true,
  'sharable': false,
  'draftable': false,
  'ignoreSeeding': false,
  'ownable': true,
  'intl': true,
  'columns': [
    {
      name: 'width',
      'required': true,
      'translations': false,
      'type': 'number',
      'title': 'Šířka (cm)',
    },
    {
      name: 'height',
      'required': true,
      'translations': false,
      'type': 'number',
      'title': 'Výška (cm)',
    },
    {
      name: 'price',
      'required': true,
      'editable': true,
      'unique': false,
      'hide': false,
      'translations': true,
      'type': 'number',
      'title': 'Cena',
    },
    {
      name: 'material_id',
      'required': true,
      'translations': false,
      'type': 'relationship',
      'multiple': false,
      'targetModelTableName': 'cardMaterial',
      'labelConstructor': '{{name}}',
      'title': 'Materiál ',
    },
    {
      name: 'image',
      'required': true,
      'translations': false,
      'multiple': false,
      'type': 'file',
      'title': 'Náhledový obrázek',
      'typeFilter': 'image',
      'admin': {
        'fieldType': 'small-image',
      },
    },
  ],
}

export default cardSizesModel