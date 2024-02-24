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
      'type': 'string',
      'title': 'Název kódu',
      admin: {
        editor: { width: 6 },
      },
    },
    {
      name: 'amount',
      'required': true,
      'unique': false,
      'type': 'number',
      'title': 'Hodnota slevy (%)',
      suffix: ' %',
      admin: {
        editor: { width: 6 },
      },
    },
    {
      name: 'enabled',
      'default': true,
      'type': 'boolean',
      'title': 'Aktivní',
      admin: {
        editor: { placement: 'aside' },
      },
    },
    {
      name: 'maxUses',
      'required': true,
      'unique': false,
      'type': 'number',
      'title': 'Maximální počet užití',
      default: 1,
      readonly: false,
      suffix: ' x',
      admin: {
        editor: { width: 6 },
      },
    },
    {
      name: 'usedTimes',
      'required': false,
      'editable': false,
      'unique': false,
      'type': 'number',
      'title': 'Počet použití',
      readonly: true,
      suffix: ' x',
      admin: {
        editor: { width: 6 },
      },
    },
    {
      name: 'wasCreatedForNewsletter',
      'editable': false,
      'default': false,
      'type': 'boolean',
      'title': 'Pro newsletter?',
      readonly: true,
      admin: {
        editor: { placement: 'aside' },
      },
    },

    {
      name: 'carts',
      hide: true,
      admin: {
        isHidden: true,
      },
      'type': 'relationship',
      'multiple': true,
      'targetModelTableName': 'carts',
      'labelConstructor': '#{{id}}',
      'title': 'Košíky',
      'mappedBy': 'promoCode',
    },
  ],
}

export default promoCodesModel