import 'htmx.org'
import Alpine from 'alpinejs'
import cardBuilder from './alpine-components/cardBuilder'
import cart from './alpine-components/cart'
import 'cropperjs/dist/cropper.css'

declare global {
  interface Window {
    Alpine: typeof Alpine
    application: {
      builder?: {
        materials: { id: string }[],
        backgrounds: { id: string }[],
        countries: { id: string }[],
        sports: { id: string }[],
        sizes: { id: string, width: string, height: string }[],

        initialValues: {
          sizeId: string,
          cardType: string
        }
      }
    }
  }
}

window.Alpine = Alpine

if (window.location.pathname.includes('/kosik')) {
  // @ts-expect-error
  import('./packeta.js')
  Alpine.data(cart.name, cart)
}

if (window.location.pathname.includes('/karty/builder')) {
  Alpine.data(cardBuilder.name, cardBuilder)
}

Alpine.start()

