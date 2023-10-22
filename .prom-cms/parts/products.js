/**
 *
 * @type {import("@prom-cms/schema").DatabaseConfigModel}
 */
const productsModel = {
  "title": "Produkty",
  "softDelete": false,
  "timestamp": true,
  "sorting": true,
  "sharable": false,
  "draftable": true,
  "ignoreSeeding": false,
  "ownable": true,
  "tableName": "products",
  "intl": true,
  "icon": "BadgeTm",
  "columns": {
    "name": {
      "required": true,
      "editable": true,
      "unique": true,
      "hide": false,
      "translations": true,
      "type": "string",
      "title": "Název",
      "admin": {
        "fieldType": "heading"
      }
    },
    "price": {
      "required": true,
      "editable": true,
      "unique": false,
      "hide": false,
      "translations": true,
      "type": "number",
      "title": "Cena"
    },
    "images": {
      "required": true,
      "editable": true,
      "unique": false,
      "hide": false,
      "translations": false,
      "multiple": true,
      "type": "file",
      "title": "Obrázky",
      "typeFilter": "image",
      "admin": {
        "fieldType": "big-image"
      }
    },
    "description": {
      "required": false,
      "editable": true,
      "unique": false,
      "hide": false,
      "translations": true,
      "type": "longText",
      "title": "Popisek"
    }
  }
}

export default productsModel