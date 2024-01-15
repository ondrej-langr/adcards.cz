import Alpine from 'alpinejs'
import KeenSlider from 'keen-slider'
import LazyLoad from 'vanilla-lazyload'
import cartForm from './alpine-components/cartForm'
import orderPage from './alpine-components/orderPage'
import cardBuilder from './alpine-components/cardBuilder'

import 'keen-slider/keen-slider.min.css'
import 'cropperjs/dist/cropper.css'
import 'htmx.org'
import './lib/lazyload-images'

declare global {
    interface Window {
        Alpine: typeof Alpine
        Packeta: any,
    }
}

window.Alpine = Alpine

if (window.location.pathname.includes('/kosik')) {
    // @ts-expect-error
    import('./packeta.js')
    Alpine.data(cartForm.name, cartForm as any)
} else if (window.location.pathname.includes('/karty/builder')) {
    Alpine.data(cardBuilder.name, cardBuilder)

    if (window.document.querySelector('.builder-slider') !== null) {
        for (const sliderElement of window.document.querySelectorAll('.builder-slider')) {
            new KeenSlider(sliderElement as HTMLElement, {
                loop: true,
                slides: {
                    perView: 'auto',
                    spacing: 10,
                    origin: 'center',
                },
                breakpoints: {
                    '(min-width: 640px)': {
                        loop: false,
                        slides: {
                            perView: 'auto',
                            spacing: 20,
                        },
                    },
                },
            })

        }
    }
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



