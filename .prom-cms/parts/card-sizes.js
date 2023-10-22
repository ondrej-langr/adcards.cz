/**
 *
 * @type {import("@prom-cms/schema").DatabaseConfigModel}
 */
const cardSizesModel = {
  "title": "Velikost karet",
  "softDelete": false,
  "timestamp": false,
  "sorting": true,
  "sharable": false,
  "draftable": false,
  "ignoreSeeding": false,
  "ownable": true,
  "tableName": "countries",
  "intl": true,
  "icon": "Dimensions",
  "columns": {
    "width": {
      "required": true,
      "translations": false,
      "type": "number",
      "title": "Šířka (cm)"
    },
    "height": {
      "required": true,
      "translations": false,
      "type": "number",
      "title": "Výška (cm)"
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
    "image": {
      "required": true,
      "translations": false,
      "multiple": false,
      "type": "file",
      "title": "Náhledový obrázek",
      "typeFilter": "image",
      "admin": {
        "fieldType": "small-image",
        "editor": {
          "placement": "aside"
        }
      }
    }
  }
}

export default cardSizesModel