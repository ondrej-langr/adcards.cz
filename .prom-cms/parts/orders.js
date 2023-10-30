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
      'editable': false,
      'required': true,
      'translations': false,
      'type': 'string',
      'title': 'Typ dopravy',
      'admin': {
        editor: { width: 6 },
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
      'enum': [
        // This is for newly created order (which may need to be paid)
        'CREATED',
        // This is for when user cancels order
        'CANCELED',
        // This is for when user has paid the order (or has chosen the bank transfer)
        'PENDING',
        // This is for when admin changes this manually and accepts the order
        'CONFIRMED',
        // This is for when the order is finished
        'FINISHED',
      ],
      'title': 'Stav',
      admin: {
        editor: {
          placement: 'aside',
        },
      },
    },
    'cards': {
      'required': false,
      'translations': false,
      'type': 'relationship',
      'multiple': true,
      'targetModel': 'cards',
      'labelConstructor': 'id',
      'title': 'Vytvořené karty',
      readonly: true,
    },
    'products': {
      'required': false,
      'translations': false,
      'type': 'relationship',
      'multiple': true,
      'targetModel': 'products',
      'labelConstructor': 'id',
      'title': 'Produkty',
      readonly: true,
    },

    'subtotal_cost': {
      'required': true,
      'editable': false,
      'unique': false,
      'hide': false,
      'translations': false,
      'type': 'number',
      'title': 'Mezisoučet',
      readonly: true,
      admin: {
        editor: {
          placement: 'aside',
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
    'total_cost': {
      'required': true,
      'editable': false,
      'unique': false,
      'translations': false,
      'type': 'number',
      'title': 'Celková částka',
      readonly: true,
      admin: {
        editor: {
          placement: 'aside',
        },
      },
    },
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