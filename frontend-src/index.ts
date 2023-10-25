import 'htmx.org'
import Alpine from 'alpinejs'
import cardBuilder from './alpine-components/cardBuilder'
import cartForm from './alpine-components/cartForm'
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
  Alpine.data(cartForm.name, cartForm)
} else if (window.location.pathname.includes('/karty/builder')) {
  Alpine.data(cardBuilder.name, cardBuilder)
}

window.Alpine.start()

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
