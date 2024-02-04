import mainPageSlidesModel from './parts/main-page-slides.js'
import cardMaterialModel from './parts/card-material.js'
import cardSizesModel from './parts/card-sizes.js'
import cardsModel from './parts/cards.js'
import countriesModel from './parts/countries.js'
import newsletterSubscriptionsModel from './parts/newsletter-subscriptions.js'
import ordersModel from './parts/orders.js'
import productsModel from './parts/products.js'
import promoCodesModel from './parts/promo-codes.js'
import cardBackgroundsModel from './parts/card-backgrounds.js'
import sportsModel from './parts/sports.js'

/**
 *
 * @type {import('@prom-cms/schema').GeneratorConfig}
 */
const config = {
  'project': {
    name: 'adcards',
    slug: 'adcards',
    url: 'http://localhost:3000',
  },
  database: {
    connections: [
      {
        name: 'default-connection',
        uri: 'pdo-sqlite:///.database/application.sqlite',
      },
    ],
    models: [
      cardBackgroundsModel,
      cardMaterialModel,
      cardSizesModel,
      cardsModel,
      countriesModel,
      mainPageSlidesModel,
      newsletterSubscriptionsModel,
      ordersModel,
      productsModel,
      promoCodesModel,
      sportsModel,
    ],
  },
}

export default config