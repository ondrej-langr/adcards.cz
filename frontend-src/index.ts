import 'htmx.org'
import Alpine from 'alpinejs'
import cardBuilder from './alpine-components/cardBuilder'
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

if (window.location.pathname.startsWith('/kosik')) {
  import('./kosik')
}

if (window.location.pathname.startsWith('/karty/builder')) {
  Alpine.data(cardBuilder.name, cardBuilder)
}

Alpine.start()

