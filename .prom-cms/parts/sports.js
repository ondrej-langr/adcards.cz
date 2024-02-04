/**
 *
 * @type {(typeof import('@prom-cms/schema').databaseConfigModelSchema)['_input']}
 */
const sportsModel = {
  title: 'Sporty',
  tableName: 'sports',
  admin: {
    icon: 'BallFootball',
  },
  sharable: false,
  softDelete: false,
  ownable: false,
  draftable: false,
  columns: [
    {
      'title': 'Název',
      'type': 'string',
      name: 'name',
      'required': true,
      'editable': true,
      'unique': true,
      'hide': false,
      'translations': true,
      'admin': {
        'fieldType': 'heading',
      },
    },
    {
      'title': 'Popisek',
      'type': 'longText',
      name: 'description',
      'required': false,
      'editable': true,
      'translations': true,
      'admin': {
        editor: { width: 6 },
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
        editor: { width: 6 },
      },
    },
  ],
}

export default sportsModel