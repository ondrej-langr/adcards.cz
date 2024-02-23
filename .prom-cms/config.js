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
import orderedProductsModel from './parts/ordered-products.js'
import cartModel from './parts/cart.js'
import cartProducts from './parts/cart-products.js'

/**
 *
 * @type {import('@prom-cms/schema').GeneratorConfig}
 */
const config = {
  'project': {
    name: 'adcards',
    slug: 'adcards',
    url: 'http://localhost:3000',
    languages: [
      'cz',
      'de',
      'sk',
    ],
  },
  database: {
    connections: [
      {
        name: 'default-connection',
        uri: `pdo-sqlite:////' . __DIR__ . '/../../.database/application.sqlite`,
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
      orderedProductsModel,
      cartModel,
      cartProducts,
    ],
  },
}

export default config