/**
 *
 * @type {(typeof import("@prom-cms/schema").databaseConfigModelSchema)["_input"]}
 */
const ordersModel = {
  "title": "Objednávky",
  "softDelete": false,
  "timestamp": true,
  "sorting": true,
  "sharable": false,
  "draftable": false,
  "ignoreSeeding": false,
  "ownable": false,
  "tableName": "orders",
  "intl": false,
  "icon": "BuildingStore",
  "columns": {
    "firstName": {
      "required": true,
      "translations": false,
      "type": "string",
      "title": "Jméno"
    },
    "lastName": {
      "required": true,
      "translations": false,
      "type": "string",
      "title": "Příjmení"
    },
    "email": {
      "required": true,
      "translations": false,
      "type": "string",
      "title": "Email"
    },
    "phone": {
      "required": true,
      "translations": false,
      "type": "string",
      "title": "Telefon"
    },
    "street": {
      "required": true,
      "translations": false,
      "type": "string",
      "title": "Ulice"
    },
    "buildingNumber": {
      "required": true,
      "translations": false,
      "type": "string",
      "title": "Číslo baráku"
    },
    "city": {
      "required": true,
      "translations": false,
      "type": "string",
      "title": "Město"
    },
    "postalCode": {
      "required": true,
      "translations": false,
      "type": "string",
      "title": "PSČ"
    },
    "note": {
      "required": false,
      "translations": false,
      "type": "longText",
      "title": "Note"
    },

    "promoCode": {
      "required": false,
      "translations": false,
      "type": "relationship",
      "targetModel": "promo_codes",
      "labelConstructor": "id",
      "title": "Slevový kód"
    },
    "cards": {
      "required": false,
      "translations": false,
      "type": "relationship",
      "multiple": true,
      "targetModel": "cards",
      "labelConstructor": "id",
      "title": "Vytvořené karty"
    },
    "products": {
      "required": false,
      "translations": false,
      "type": "relationship",
      "multiple": true,
      "targetModel": "products",
      "labelConstructor": "id",
      "title": "Artefakty"
    },

    "finalPrice": {
      "required": true,
      "editable": false,
      "unique": false,
      "hide": false,
      "translations": false,
      "type": "number",
      "title": "Celková částka"
    },
    "currency": {
      "required": true,
      "editable": false,
      "unique": false,
      "hide": false,
      "translations": false,
      "type": "enum",
      "enum": ["CZK", "EUR"],
      "title": "Měna"
    }
  }
}

export default ordersModel