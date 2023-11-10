/**
 *
 * @type {(typeof import('@prom-cms/schema').databaseConfigModelSchema)['_input']}
 */
const cardSizesModel = {
  'title': 'Velikost karet',
  'softDelete': false,
  'timestamp': false,
  'sorting': true,
  'sharable': false,
  'draftable': false,
  'ignoreSeeding': false,
  'ownable': true,
  'tableName': 'card_sizes',
  'intl': true,
  'icon': 'Dimensions',
  'columns': {
    'width': {
      'required': true,
      'translations': false,
      'type': 'number',
      'title': 'Šířka (cm)',
    },
    'height': {
      'required': true,
      'translations': false,
      'type': 'number',
      'title': 'Výška (cm)',
    },
    'price': {
      'required': true,
      'editable': true,
      'unique': false,
      'hide': false,
      'translations': true,
      'type': 'number',
      'title': 'Cena',
    },
    'material_id': {
      'required': true,
      'translations': false,
      'type': 'relationship',
      'multiple': false,
      'targetModel': 'cardMaterial',
      'labelConstructor': 'name',
      'title': 'Materiál ',
    },
    'image': {
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
  },
}

export default cardSizesModel