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
      'unique': true,
      localized: true,
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
      'type': 'number',
      'title': 'Cena',
      suffix: ' Kč',
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
      'multiple': true,
      'type': 'file',
      'title': 'Obrázky',
      'typeFilter': 'image',
      'admin': {
        'fieldType': 'big-image',
      },
    },
    {
      name: 'excerpt',
      'required': false,
      'hide': false,
      localized: true,
      'type': 'longText',
      'title': 'Shrnutí',
    },
    {
      name: 'description',
      'required': false,
      'hide': false,
      localized: true,
      'type': 'longText',
      'title': 'Popisek',
      admin: {
        fieldType: 'wysiwyg',
      },
    },
    {
      name: 'isBonus',
      'required': false,
      'type': 'boolean',
      'defaultValue': false,
      'title': 'Zvýhodněný produkt ke kartám',
      'admin': {
        editor: { placement: 'aside' },
      },
    },


    {
      name: 'usedForOrders',
      'required': false,
      'translations': false,
      'type': 'relationship',
      'title': 'Produkty',
      multiple: true,
      readonly: true,
      hide: true,
      admin: {
        isHidden: true,
      },
      'labelConstructor': '{{id}}',
      targetModelTableName: 'ordered_products',
      'mappedBy': 'product',
    },

    {
      name: 'usedForCarts',
      hide: true,
      admin: {
        isHidden: true,
      },
      'type': 'relationship',
      'multiple': true,
      'targetModelTableName': 'cart_products',
      'labelConstructor': '#{{id}}',
      'title': 'Košíky',
      'mappedBy': 'product',
    },
  ],
}

export default productsModel