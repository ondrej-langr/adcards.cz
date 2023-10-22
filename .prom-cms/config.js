/**
 *
 * @type {import("@prom-cms/schema").GeneratorConfig}
 */
module.exports = {
  "project": {
    "name": "adcards",
    "slug": "adcards",
    "url": "http://localhost"
  },
  database: {
    models: {
      "cardBackgrounds": require("./parts/main-page-slides.js"),
      "cardMaterial": require("./parts/card-material.js"),
      "cardSizes": require("./parts/card-sizes.js"),
      "cards": require("./parts/cards.js"),
      "countries": require("./parts/countries.js"),
      "mainPageSlides": require("./parts/main-page-slides.js"),
      "newsletterSubscriptions": require("./parts/newsletter-subscriptions.js"),
      "orders": require("./parts/orders.js"),
      "products": require("./parts/products.js"),
      "promoCodes": require("./parts/promo-codes.js"),
    }
  }
}