import "htmx.org"
import Alpine from 'alpinejs'
import cardBuilder from './alpine-components/cardBuilder'

declare global {
  interface Window {
    Alpine: typeof Alpine
    application: {
      builder?: {
        materialIds: string[],
        backgroundIds: string[],
        countryIds: string[],
      }
    }
  }
}

window.Alpine = Alpine

if (window.location.pathname.startsWith("/kosik")) {
  import("./kosik")
}

if (window.location.pathname.startsWith("/karty/builder")) {
  Alpine.data(cardBuilder.name, cardBuilder)
}

Alpine.start()

