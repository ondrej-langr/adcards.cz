/**
 *
 * @type {import("@prom-cms/schema").DatabaseConfigModel}
 */
module.exports = {
  "title": "Odběry newsletteru",
  "softDelete": false,
  "timestamp": true,
  "sorting": false,
  "sharable": false,
  "draftable": false,
  "ignoreSeeding": false,
  "ownable": false,
  "tableName": "newsletter_subscriptions",
  "intl": false,
  "icon": "News",
  "columns": {
    "email": {
      "required": true,
      "editable": true,
      "unique": true,
      "hide": false,
      "translations": false,
      "type": "string",
      "title": "Email"
    }
  }
}