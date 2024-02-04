/**
 *
 * @type {(typeof import('@prom-cms/schema').databaseConfigModelSchema)['_input']}
 */
const countriesModel = {
  'title': 'Země',
  'tableName': 'countries',
  admin: {
    icon: 'World',
  },
  'softDelete': false,
  'timestamp': false,
  'sorting': true,
  'sharable': false,
  'draftable': false,
  'ignoreSeeding': false,
  'ownable': false,
  'intl': false,
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
        editor: {
          width: 6,
        },
      },
    },
    {
      name: 'flag',
      'required': true,
      'editable': true,
      'unique': false,
      'hide': false,
      'translations': false,
      'multiple': false,
      'type': 'file',
      'title': 'Vlajka',
      'typeFilter': 'image',
      admin: {
        editor: {
          width: 6,
        },
      },
    },
  ],
}

export default countriesModel