/**
 *
 * @type {(typeof import('@prom-cms/schema').databaseConfigModelSchema)['_input']}
 */
const cardMaterialModel = {
  'title': 'Materiál karet',
  'tableName': 'card_material',
  admin: {
    icon: 'Cell',
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
      localized: true,
      'admin': {
        'fieldType': 'heading',
      },
    },
    {
      name: 'description',
      'required': true,
      'editable': true,
      'translations': true,
      localized: true,
      'type': 'longText',
      'title': 'Popisek',
      admin: {
        editor: {
          width: 6,
        },
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
        editor: {
          width: 6,
        },
      },
    },
    {
      name: 'bonuses',
      'required': false,
      'translations': false,
      'type': 'json',
      'title': 'Bonusové informace za příplatek',
      'admin': {
        'fieldType': 'repeater',
        'columns': [
          {
            name: 'name',
            'required': true,
            'type': 'string',
          },
          {
            name: 'price',
            'required': true,
            'type': 'number',
            title: 'Cena v Kč',
          },
        ],
      },
    },
    {
      name: 'cardSizes',
      'required': false,
      'editable': false,
      'unique': false,
      'hide': false,
      'translations': false,
      'multiple': true,
      'type': 'relationship',
      'title': 'Přiřazené velikosti',
      targetModelTableName: 'card_sizes',
      'labelConstructor': '{{id}}',
      'admin': {
        editor: { width: 12 },
      },
      'mappedBy': 'material',
    },
  ],
}

export default cardMaterialModel