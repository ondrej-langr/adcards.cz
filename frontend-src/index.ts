import Alpine from 'alpinejs'
import cartForm from './alpine-components/cartForm'
import orderPage from './alpine-components/orderPage'
import cardBuilder from './alpine-components/cardBuilder'

import 'cropperjs/dist/cropper.css'
import 'htmx.org'

declare global {
  interface Window {
    Alpine: typeof Alpine
    Packeta: any,
    application: {
      builder?: {
        materials: { id: string, sizes?: NonNullable<Window['application']['builder']>['sizes'] }[],
        backgrounds: { id: string }[],
        countries: { id: string }[],
        sports: { id: string }[],
        sizes: { id: string, width: string, height: string, material: string }[],

        state: {
          form: {
            values: {
              rating?: string,
              position?: string,
              cardType: string
              sizeId?: string,
              materialId?: string,
              sportId?: string
              backgroundId?: string
              currentStep: number
            },
            errors: any[],
            successes: any[],
          }
        }
      }
    }
  }
}

window.Alpine = Alpine

if (window.location.pathname.includes('/kosik')) {
  // @ts-expect-error
  import('./packeta.js')
  Alpine.data(cartForm.name, cartForm as any)
} else if (window.location.pathname.includes('/karty/builder')) {
  Alpine.data(cardBuilder.name, cardBuilder)
}

Alpine.data(orderPage.name, orderPage as any)
Alpine.start()

// handles reset of all input fields([name="quantity"]) that belongs to product on current page
// This is triggered usually when there is a product rendered
document.body.addEventListener('resetAddToCartQuantity', function(evt) {
  const elements = document.querySelectorAll('.add-to-cart__value')

  for (const element of elements) {
    if (element instanceof HTMLInputElement) {
      const valueAsNumber = Number(element.getAttribute('min') ?? '0')

      if (Number.isNaN(valueAsNumber)) {
        console.warn('Invalid min value encountered, skipping')
        continue
      }

      element.value = String(valueAsNumber)
    }
  }
})
