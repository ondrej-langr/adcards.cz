/**
 *
 * @type {(typeof import('@prom-cms/schema').databaseConfigModelSchema)['_input']}
 */
const newsletterSubscriptionsModel = {
  'title': 'Odběry newsletteru',
  'softDelete': false,
  'timestamp': true,
  'sorting': false,
  'sharable': false,
  'draftable': false,
  'ignoreSeeding': false,
  'ownable': false,
  'tableName': 'newsletter_subscriptions',
  'intl': false,
  'icon': 'News',
  'columns': {
    'email': {
      'required': true,
      'editable': true,
      'unique': true,
      'hide': false,
      'translations': false,
      'type': 'string',
      'title': 'Email',
    },
  },
}

export default newsletterSubscriptionsModel