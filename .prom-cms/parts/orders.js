/**
 *
 * @type {['vytvořeno', 'nezaplaceno', 'nepotvrzeno', 'potvrzeno', 'zrušeno', 'dokončeno']}
 */
export const orderStatuses = [
  // This is for newly created order (which may need to be paid)
  'vytvořeno',
  // This is for when user selected payment by gateway (such as paypal)
  'nezaplaceno',
  // This is for when user has paid the order (or has chosen the bank transfer)
  'nepotvrzeno',
  // This is for when admin changes this manually and accepts the order
  'potvrzeno',
  // This is for when user cancels order
  'zrušeno',
  // This is for when the order is finished
  'dokončeno',
]

/**
 *
 * @type {(typeof import('@prom-cms/schema').databaseConfigModelSchema)['_input']}
 */
const ordersModel = {
  'title': 'Objednávky',
  'softDelete': false,
  'timestamp': true,
  'sorting': true,
  'sharable': false,
  'draftable': false,
  'ignoreSeeding': false,
  'ownable': false,
  'tableName': 'orders',
  'intl': false,
  'icon': 'BuildingStore',
  'columns': {
    '_uuid': {
      'required': true,
      'translations': false,
      'type': 'string',
      'title': 'Unikátní identifikátor objednávky',
      editable: false,
      admin: {
        isHidden: true,
      },
    },

    'firstName': {
      'required': true,
      'translations': false,
      'type': 'string',
      'title': 'Jméno',
      'admin': {
        editor: { width: 6 },
      },
    },
    'lastName': {
      'required': true,
      'translations': false,
      'type': 'string',
      'title': 'Příjmení',
      'admin': {
        editor: { width: 6 },
      },
    },
    'email': {
      'required': true,
      'translations': false,
      'type': 'string',
      'title': 'Email',
      'admin': {
        editor: { width: 6 },
      },
    },
    'phone': {
      'required': true,
      'translations': false,
      'type': 'string',
      'title': 'Telefon',
      'admin': {
        editor: { width: 6 },
      },
    },
    'street': {
      'required': true,
      'translations': false,
      'type': 'string',
      'title': 'Ulice',
    },
    'building_number': {
      'required': true,
      'translations': false,
      'type': 'string',
      'title': 'Číslo baráku',
      'admin': {
        editor: { width: 4 },
      },
    },
    'city': {
      'required': true,
      'translations': false,
      'type': 'string',
      'title': 'Město',
      'admin': {
        editor: { width: 4 },
      },
    },
    'postal_code': {
      'required': true,
      'translations': false,
      'type': 'string',
      'title': 'PSČ',
      'admin': {
        editor: { width: 4 },
      },
    },
    'note': {
      'required': false,
      'translations': false,
      'type': 'longText',
      'title': 'Note',
    },
    'shipping_method': {
      'required': true,
      readonly: true,
      'translations': false,
      'type': 'string',
      'title': 'Doprava',
      'admin': {
        editor: { width: 8 },
      },
    },
    'shipping_rate': {
      'required': true,
      readonly: true,
      'translations': false,
      'type': 'number',
      'title': 'Cena za dopravu',
      'admin': {
        editor: { width: 4 },
      },
    },
    'payment_method': {
      'editable': false,
      'required': true,
      'translations': false,
      'type': 'string',
      'title': 'Typ platby',
      'admin': {
        editor: { width: 6 },
      },
    },

    'status': {
      'required': true,
      'translations': false,
      'type': 'enum',
      'enum': orderStatuses,
      'title': 'Stav',
      admin: {
        editor: {
          placement: 'aside',
        },
      },
    },
    'total_cost': {
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
    'paypal_transaction_id': {
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
    'cards': {
      'required': false,
      'translations': false,
      'type': 'json',
      'title': 'Karty',
      readonly: true,
      'admin': {
        'fieldType': 'repeater',
        'columns': {
          'card_id': {
            'required': true,
            'type': 'relationship',
            'multiple': false,
            'targetModel': 'cards',
            'labelConstructor': '{{name}} - {{size_id}} - {{final_price}}Kč',
            readonly: true,
          },
        },
      },
    },

    'products': {
      'required': false,
      'translations': false,
      'type': 'json',
      'title': 'Produkty',
      readonly: true,
      'admin': {
        'fieldType': 'repeater',
        'columns': {
          'product_id': {
            'required': true,
            'translations': false,
            'type': 'relationship',
            'targetModel': 'products',
            'labelConstructor': '{{name}} ({{id}})',
            'title': 'Produkt',
          },
          'count': {
            'required': true,
            'translations': false,
            'type': 'number',
            'title': 'Počet',
          },
        },
      },
    },

    'promo_code_value': {
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
    'promo_code_amount': {
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
    'currency': {
      'required': true,
      'editable': false,
      'unique': false,
      'translations': false,
      'type': 'enum',
      'enum': ['CZK', 'EUR'],
      readonly: true,
      'title': 'Měna',
    },
  },
}

export default ordersModel