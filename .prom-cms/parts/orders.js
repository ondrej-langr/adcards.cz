/**
 *
 * @type {const}
 */
export const orderStatuses = {
  // This is for newly created order (which may need to be paid)
  CREATED: 'vytvořeno',
  // This is for when user selected payment by gateway (such as paypal)
  UNPAID: 'nezaplaceno',
  // This is for when user has paid the order (or has chosen the bank transfer)
  NOT_VERIFIED: 'nepotvrzeno',
  // This is for when admin changes this manually and accepts the order
  VERIFIED: 'potvrzeno',
  // This is for when user cancels order
  ABANDONED: 'zrušeno',
  // This is for when the order is finished
  FINISHED: 'dokončeno',
}

/**
 *
 * @type {(typeof import('@prom-cms/schema').databaseConfigModelSchema)['_input']}
 */
const ordersModel = {
  'title': 'Objednávky',
  'tableName': 'orders',
  admin: {
    'icon': 'BuildingStore',
  },
  'softDelete': false,
  'timestamp': true,
  'sorting': true,
  'sharable': false,
  'draftable': false,
  'ignoreSeeding': false,
  'ownable': false,
  'intl': false,
  'columns': [
    {
      name: '_uuid',
      'required': true,
      'translations': false,
      'type': 'string',
      'title': 'Unikátní identifikátor objednávky',
      editable: false,
      admin: {
        isHidden: true,
      },
    },

    {
      name: 'firstName',
      'required': true,
      'translations': false,
      'type': 'string',
      'title': 'Jméno',
      'admin': {
        editor: { width: 6 },
      },
    },
    {
      name: 'lastName',
      'required': true,
      'translations': false,
      'type': 'string',
      'title': 'Příjmení',
      'admin': {
        editor: { width: 6 },
      },
    },
    {
      name: 'email',
      'required': true,
      'translations': false,
      'type': 'string',
      'title': 'Email',
      'admin': {
        editor: { width: 6 },
      },
    },
    {
      name: 'phone',
      'required': true,
      'translations': false,
      'type': 'string',
      'title': 'Telefon',
      'admin': {
        editor: { width: 6 },
      },
    },
    {
      name: 'street',
      'required': true,
      'translations': false,
      'type': 'string',
      'title': 'Ulice',
    },
    {
      name: 'building_number',
      'required': true,
      'translations': false,
      'type': 'string',
      'title': 'Číslo baráku',
      'admin': {
        editor: { width: 4 },
      },
    },
    {
      name: 'city',
      'required': true,
      'translations': false,
      'type': 'string',
      'title': 'Město',
      'admin': {
        editor: { width: 4 },
      },
    },
    {
      name: 'postal_code',
      'required': true,
      'translations': false,
      'type': 'string',
      'title': 'PSČ',
      'admin': {
        editor: { width: 4 },
      },
    },
    {
      name: 'note',
      'required': false,
      'translations': false,
      'type': 'longText',
      'title': 'Note',
    },
    {
      name: 'shipping_method',
      'required': true,
      readonly: true,
      'translations': false,
      'type': 'string',
      'title': 'Doprava',
      'admin': {
        editor: { width: 8 },
      },
    },
    {
      name: 'shipping_rate',
      'required': true,
      readonly: true,
      'translations': false,
      'type': 'number',
      'title': 'Cena za dopravu',
      'admin': {
        editor: { width: 4 },
      },
    },
    {
      name: 'payment_method',
      'editable': false,
      'required': true,
      'translations': false,
      'type': 'string',
      'title': 'Typ platby',
      'admin': {
        editor: { width: 6 },
      },
    },

    {
      name: 'status',
      'required': true,
      'translations': false,
      'type': 'enum',
      'enum': {
        name: 'OrderState',
        values: orderStatuses,
      },
      'title': 'Stav',
      admin: {
        editor: {
          placement: 'aside',
        },
      },
    },
    {
      name: 'total_cost',
      'type': 'number',
      'title': 'Celková částka',
      'required': true,
      'translations': false,
      readonly: true,
      admin: {
        editor: {
          placement: 'aside',
        },
      },
    },
    {
      name: 'paypal_transaction_id',
      'type': 'string',
      'required': false,
      'translations': false,
      'title': 'ID PayPal transakce',
      readonly: true,
      admin: {
        editor: {
          placement: 'aside',
        },
      },
    },
    // {
    //   name: 'cards',
    //   'required': false,
    //   'translations': false,
    //   'type': 'json',
    //   'title': 'Karty',
    //   readonly: true,
    //   'admin': {
    //     'fieldType': 'repeater',
    //     'columns': [
    //       {
    //         name: 'card_id',
    //         'required': true,
    //         'type': 'relationship',
    //         'multiple': false,
    //         'targetModel': 'cards',
    //         'labelConstructor': '{{name}} - {{size_id}} - {{final_price}}Kč',
    //         readonly: true,
    //       },
    //     ],
    //   },
    // },

    // {
    //   name: 'products',
    //   'required': false,
    //   'translations': false,
    //   'type': 'json',
    //   'title': 'Produkty',
    //   readonly: true,
    //   'admin': {
    //     'fieldType': 'repeater',
    //     'columns': [
    //       {
    //         name: 'product_id',
    //         'required': true,
    //         'translations': false,
    //         'type': 'relationship',
    //         'targetModel': 'products',
    //         'labelConstructor': '{{name}} ({{id}})',
    //         'title': 'Produkt',
    //       },
    //       {
    //         name: 'count',
    //         'required': true,
    //         'translations': false,
    //         'type': 'number',
    //         'title': 'Počet',
    //       },
    //     ],
    //   },
    // },

    {
      'name': 'promo_code_value',
      'required': false,
      'translations': false,
      'type': 'string',
      'title': 'Slevový kód - název',
      readonly: true,
      admin: {
        editor: {
          width: 6,
          placement: 'aside',
        },
      },
    },
    {
      'name': 'promo_code_amount',
      'required': false,
      'translations': false,
      'type': 'number',
      'title': 'Slevový kód - hodnota',
      readonly: true,
      admin: {
        editor: {
          width: 6,
          placement: 'aside',
        },
      },
    },
    // TODO Add paypal transaction id here for better clarity
    {
      'name': 'currency',
      'required': true,
      'editable': false,
      'unique': false,
      'translations': false,
      'type': 'enum',
      enum: {
        name: 'Currency',
        values: {
          'CZK': 'CZK',
          'EUR': 'EUR',
        },
      },
      readonly: true,
      'title': 'Měna',
    },
  ],
}

export default ordersModel