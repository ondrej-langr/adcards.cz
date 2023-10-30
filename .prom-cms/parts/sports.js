/**
 *
 * @type {(typeof import('@prom-cms/schema').databaseConfigModelSchema)['_input']}
 */
const sportsModel = {
  admin: {},
  icon: 'BallFootball',
  sharable: false,
  tableName: 'sports',
  softDelete: false,
  ownable: false,
  title: 'Sporty',
  draftable: false,
  columns: {
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
      'required': false,
      'editable': true,
      'translations': true,
      'type': 'longText',
      'title': 'Popisek',
      'admin': {
        editor: { width: 6 },
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
        editor: { width: 6 },
      },
    },
  },
}

export default sportsModel