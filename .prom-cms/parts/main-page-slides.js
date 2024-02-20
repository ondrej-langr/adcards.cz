/**
 *
 * @type {(typeof import('@prom-cms/schema').databaseConfigModelSchema)['_input']}
 */
const mainPageSlidesModel = {
  'title': 'Položky slideru na hlavní stránce',
  'tableName': 'main_page_slides',
  admin: {
    'icon': 'Slideshow',
  },
  'softDelete': false,
  'sorting': true,
  'sharable': false,
  'draftable': false,
  'intl': true,
  'columns': [
    {
      name: 'title',
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
    {
      name: 'subTitle',
      'required': false,
      'editable': true,
      'hide': false,
      'translations': true,
      'type': 'string',
      'title': 'Subtitulek',
    },
    {
      name: 'buttonUrl',
      'required': false,
      'hide': false,
      'translations': true,
      'type': 'json',
      'title': 'Tlačítko',
      admin: {
        fieldType: 'linkButton',
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
  ],
}

export default mainPageSlidesModel