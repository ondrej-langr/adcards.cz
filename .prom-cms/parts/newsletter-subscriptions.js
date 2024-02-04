/**
 *
 * @type {(typeof import('@prom-cms/schema').databaseConfigModelSchema)['_input']}
 */
const newsletterSubscriptionsModel = {
  'title': 'Odběry newsletteru',
  'tableName': 'newsletter_subscriptions',
  admin: {
    icon: 'News',
  },
  'softDelete': false,
  'timestamp': true,
  'sorting': false,
  'sharable': false,
  'draftable': false,
  'ignoreSeeding': false,
  'ownable': false,
  'intl': false,
  'columns': [
    {
      name: 'email',
      'required': true,
      'editable': true,
      'unique': true,
      'hide': false,
      'translations': false,
      'type': 'string',
      'title': 'Email',
    },
  ],
}

export default newsletterSubscriptionsModel