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
    },
    'lastName': {
      'required': true,
      'translations': false,
      'type': 'string',
      'title': 'Příjmení',
    },
    'email': {
      'required': true,
      'translations': false,
      'type': 'string',
      'title': 'Email',
    },
    'phone': {
      'required': true,
      'translations': false,
      'type': 'string',
      'title': 'Telefon',
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
    },
    'city': {
      'required': true,
      'translations': false,
      'type': 'string',
      'title': 'Město',
    },
    'postal_code': {
      'required': true,
      'translations': false,
      'type': 'string',
      'title': 'PSČ',
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
    },
    'payment_method': {
      'editable': false,
      'required': true,
      'translations': false,
      'type': 'string',
      'title': 'Typ platby',
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
    },

    'promo_code': {
      'required': false,
      'translations': false,
      'type': 'relationship',
      'targetModel': 'promo_codes',
      'labelConstructor': 'id',
      'title': 'Slevový kód',
    },
    'cards': {
      'required': false,
      'translations': false,
      'type': 'relationship',
      'multiple': true,
      'targetModel': 'cards',
      'labelConstructor': 'id',
      'title': 'Vytvořené karty',
    },
    'products': {
      'required': false,
      'translations': false,
      'type': 'relationship',
      'multiple': true,
      'targetModel': 'products',
      'labelConstructor': 'id',
      'title': 'Produkty',
    },

    'cost': {
      'required': true,
      'editable': false,
      'unique': false,
      'hide': false,
      'translations': false,
      'type': 'number',
      'title': 'Celková částka',
    },
    'currency': {
      'required': true,
      'editable': false,
      'unique': false,
      'hide': false,
      'translations': false,
      'type': 'enum',
      'enum': ['CZK', 'EUR'],
      'title': 'Měna',
    },
  },
}

export default ordersModel