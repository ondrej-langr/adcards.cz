/**
 *
 * @type {(typeof import('@prom-cms/schema').databaseConfigModelSchema)['_input']}
 */
const productsModel = {
  'title': 'Produkty',
  'tableName': 'products',
  admin: {
    'icon': 'BadgeTm',
  },
  'softDelete': false,
  'timestamp': true,
  'sorting': true,
  'sharable': false,
  'draftable': true,
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
        editor: { width: 6 },
      },
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
      'admin': {
        editor: { width: 6 },
      },
    },
    {
      name: 'images',
      'required': true,
      'editable': true,
      'unique': false,
      'hide': false,
      'translations': false,
      'multiple': true,
      'type': 'file',
      'title': 'Obrázky',
      'typeFilter': 'image',
      'admin': {
        'fieldType': 'big-image',
      },
    },
    {
      name: 'description',
      'required': false,
      'hide': false,
      'translations': true,
      'type': 'longText',
      'title': 'Popisek',
      admin: {
        fieldType: 'wysiwyg',
      },
    },
    {
      name: 'isBonus',
      'required': false,
      'translations': false,
      'type': 'boolean',
      'defaultValue': false,
      'title': 'Zvýhodněný produkt ke kartám',
      'admin': {
        editor: { placement: 'aside' },
      },
    },
  ],
}

export default productsModel