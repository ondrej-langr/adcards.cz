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
 * @type {import("@prom-cms/schema").GeneratorConfig}
 */
const config = {
  "project": {
    "name": "adcards",
    "slug": "adcards",
    "url": "http://localhost"
  },
  database: {
    models: {
      "cardBackgrounds": cardBackgroundsModel,
      "cardMaterial": cardMaterialModel,
      "cardSizes": cardSizesModel,
      "cards": cardsModel,
      "countries": countriesModel,
      "mainPageSlides": mainPageSlidesModel,
      "newsletterSubscriptions": newsletterSubscriptionsModel,
      "orders": ordersModel,
      "products":productsModel,
      "promoCodes": promoCodesModel,
      "sports": sportsModel,
    }
  }
}

export default config