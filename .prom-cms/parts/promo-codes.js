/**
 *
 * @type {import("@prom-cms/schema").DatabaseConfigModel}
 */
module.exports = {
  "title": "Promo Kódy",
  "softDelete": false,
  "timestamp": true,
  "sorting": true,
  "sharable": false,
  "draftable": false,
  "ignoreSeeding": false,
  "ownable": true,
  "tableName": "promo_codes",
  "intl": false,
  "icon": "ReceiptTax",
  "columns": {
    "code": {
      "required": true,
      "editable": true,
      "unique": true,
      "hide": false,
      "translations": true,
      "type": "string",
      "title": "Hodnota kódu"
    },
    "amount": {
      "required": true,
      "editable": true,
      "unique": false,
      "hide": false,
      "translations": false,
      "type": "number",
      "title": "Hodnota slevy (%)"
    },
    "enabled": {
      "required": false,
      "editable": true,
      "unique": false,
      "default": true,
      "hide": false,
      "translations": false,
      "type": "boolean",
      "title": "Aktivní"
    },
    "usedTimes": {
      "required": false,
      "editable": false,
      "unique": false,
      "hide": false,
      "translations": false,
      "type": "number",
      "title": "Počet použití"
    },
    "wasCreatedForNewsletter": {
      "required": false,
      "editable": false,
      "unique": false,
      "default": false,
      "hide": false,
      "translations": false,
      "type": "boolean",
      "title": "Bylo vytvořeno pro newsletter?"
    }
  }
}