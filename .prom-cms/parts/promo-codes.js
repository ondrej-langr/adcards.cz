/**
 *
 * @type {(typeof import('@prom-cms/schema').databaseConfigModelSchema)['_input']}
 */
const promoCodesModel = {
  'title': 'Promo Kódy',
  'tableName': 'promo_codes',
  admin: {
    'icon': 'ReceiptTax',
  },
  'softDelete': false,
  'timestamp': true,
  'sorting': true,
  'sharable': false,
  'draftable': false,
  'ignoreSeeding': false,
  'ownable': true,
  'intl': false,
  'columns': [
    {
      name: 'code',
      'required': true,
      'editable': true,
      'unique': true,
      'hide': false,
      'translations': true,
      'type': 'string',
      'title': 'Hodnota kódu',
      admin: {
        editor: { width: 4 },
      },
    },
    {
      name: 'amount',
      'required': true,
      'editable': true,
      'unique': false,
      'hide': false,
      'translations': false,
      'type': 'number',
      'title': 'Hodnota slevy (%)',
      admin: {
        editor: { width: 4 },
      },
    },
    {
      name: 'enabled',
      'required': false,
      'editable': true,
      'unique': false,
      'default': true,
      'hide': false,
      'translations': false,
      'type': 'boolean',
      'title': 'Aktivní',
      admin: {
        editor: { width: 4 },
      },
    },
    {
      name: 'usedTimes',
      'required': false,
      'editable': false,
      'unique': false,
      'hide': false,
      'translations': false,
      'type': 'number',
      'title': 'Počet použití',
      readonly: true,
      admin: {
        editor: { width: 6 },
      },
    },
    {
      name: 'wasCreatedForNewsletter',
      'required': false,
      'editable': false,
      'unique': false,
      'default': false,
      'hide': false,
      'translations': false,
      'type': 'boolean',
      'title': 'Bylo vytvořeno pro newsletter?',
      readonly: true,
      admin: {
        editor: { width: 6 },
      },
    },
  ],
}

export default promoCodesModel