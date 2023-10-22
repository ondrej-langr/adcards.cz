/**
 *
 * @type {(typeof import("@prom-cms/schema").databaseConfigModelSchema)["_input"]}
 */
const cardsModel = {
  "title": "Objednané karty",
  "softDelete": false,
  "timestamp": true,
  "sorting": true,
  "sharable": false,
  "draftable": false,
  "ignoreSeeding": false,
  "ownable": false,
  "tableName": "cards",
  "intl": false,
  "icon": "Id",
  "columns": {
    "playerImage": {
      "required": false,
      "translations": false,
      "multiple": false,
      "type": "file",
      "title": "Obrázek hráče",
      "typeFilter": "image",
      "admin": {
        "fieldType": "small-image"
      }
    },
    "name": {
      "required": true,
      "editable": true,
      "unique": true,
      "hide": false,
      "translations": true,
      "type": "string",
      "title": "Název"
    },
    "rating": {
      "required": true,
      "editable": true,
      "unique": false,
      "hide": false,
      "translations": false,
      "type": "number",
      "title": "Hodnocení"
    },
    "background": {
      "required": true,
      "translations": false,
      "type": "relationship",
      "multiple": false,
      "targetModel": "card_backgrounds",
      "labelConstructor": "id",
      "title": "Pozadí karty"
    },
    "country": {
      "required": true,
      "translations": false,
      "type": "relationship",
      "multiple": false,
      "targetModel": "countries",
      "labelConstructor": "id",
      "title": "Země"
    },
    "sport": {
      "required": true,
      "translations": false,
      "type": "relationship",
      "multiple": false,
      "targetModel": "sports",
      "labelConstructor": "id",
      "title": "Sport"
    },
    "stats": {
      "required": true,
      "translations": false,
      "type": "json",
      "title": "Stats"
    },
    "cardType": {
      "required": true,
      "translations": false,
      "type": "enum",
      "enum": ["goalKeeper", "realPlayer", "player", "manager"],
      "title": "Typ karty"
    },
    "size": {
      "required": true,
      "translations": false,
      "type": "relationship",
      "multiple": false,
      "targetModel": "card_sizes",
      "labelConstructor": "id",
      "title": "Velikost"
    },
    "finalPrice": {
      "required": true,
      "editable": false,
      "unique": false,
      "hide": false,
      "translations": false,
      "type": "number",
      "title": "Cena"
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

export default  cardsModel