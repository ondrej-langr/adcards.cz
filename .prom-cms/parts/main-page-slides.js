/**
 *
 * @type {(typeof import('@prom-cms/schema').databaseConfigModelSchema)['_input']}
 */
const mainPageSlidesModel = {
  'title': 'Položky slideru na hlavní stránce',
  'softDelete': false,
  'sorting': true,
  'sharable': false,
  'draftable': false,
  'tableName': 'main_page_slides',
  'intl': true,
  'icon': 'Slideshow',
  'columns': {
    'title': {
      'required': true,
      'editable': true,
      'unique': true,
      'hide': false,
      'translations': true,
      'type': 'string',
      'title': 'Titulek',
      'admin': {
        'fieldType': 'heading',
      },
    },
    'subTitle': {
      'required': false,
      'editable': true,
      'hide': false,
      'translations': true,
      'type': 'string',
      'title': 'Subtitulek',
    },
    'buttonUrl': {
      'required': false,
      'editable': true,
      'hide': false,
      'translations': true,
      'type': 'string',
      'title': 'Odkaz pro tlačítko',
      admin: {
        editor: {
          width: 6,
        },
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
        editor: {
          width: 6,
        },
      },
    },
  },
}

export default mainPageSlidesModel