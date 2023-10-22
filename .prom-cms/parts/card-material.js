/**
 *
 * @type {(typeof import("@prom-cms/schema").databaseConfigModelSchema)["_input"]}
 */
const cardMaterialModel = {
  "title": "Materiál karet",
  "softDelete": false,
  "timestamp": true,
  "sorting": true,
  "sharable": false,
  "draftable": false,
  "ignoreSeeding": false,
  "ownable": true,
  "tableName": "card_material",
  "intl": true,
  "icon": "Cell",
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
    "description": {
      "required": true,
      "editable": true,
      "translations": true,
      "type": "longText",
      "title": "Popisek"
    },
    "image": {
      "required": true,
      "editable": true,
      "unique": false,
      "hide": false,
      "translations": false,
      "multiple": false,
      "type": "file",
      "title": "Obrázek",
      "typeFilter": "image",
      "admin": {
        "fieldType": "big-image"
      }
    }
  }
}

export default  cardMaterialModel