import { AlpineComponent } from 'alpinejs'
import { z } from 'zod'
import { loadScript } from '@paypal/paypal-js'
import *  as ordersModelDefinition from '../../.prom-cms/parts/orders'

const orderStatusSchema = z.enum(ordersModelDefinition.orderStatuses as [string, ...string[]])

const orderSchema = z.object({
  status: orderStatusSchema,
  currency: z.string(),
})

export const cartFormOptions = z.object({
  order: orderSchema,
  initialPaymentDialogShown: z.boolean(),
  thankYouMessageShown: z.boolean(),
  payPal: z.object({
    clientId: z.string().min(1),

    routes: z.object({
      create: z.string(),
      capture: z.string(),
    }),
  }),
})

export type CartFormProps = z.infer<typeof cartFormOptions>

export default function orderPage(params: CartFormProps): AlpineComponent<any> {
  const paramsValidation = cartFormOptions.safeParse(params)
  if (!paramsValidation.success) {
    console.log({ validationErrors: paramsValidation.error })
    throw new Error('Order page component did not get sufficient data. Not starting')
  }
  const searchParams = new URLSearchParams(window.location.search)
  const {
    order,
    payPal,
    initialPaymentDialogShown,
    thankYouMessageShown,
  } = params

  return {
    modalOpen: initialPaymentDialogShown,

    errors: {
      payPal: '',
    },

    init() {
      const paypalButtonsRoot = this.$refs.payPalButtons

      // Remove search params if necessary
      if (initialPaymentDialogShown || thankYouMessageShown) {
        const location = new URL(window.location.pathname, window.location.origin)

        history.replaceState(null, '', location)
      }

      if (paypalButtonsRoot && payPal.clientId) {
        this.initPaypal({
          buttonRoot: paypalButtonsRoot,
          clientId: payPal.clientId,
        })
      }
    },

    onPayPalCompleted() {
      window.location.search = '?thank-you=true'
    },

    initPaypal(options: { clientId: string, buttonRoot: HTMLElement }) {
      const { clientId, buttonRoot } = options
      const component = this

      // TODO: remove local up to paypal itself
      loadScript({ clientId, locale: 'cs_CZ', currency: order.currency })
        .then((paypal) => {
          if (paypal) {
            const skeletons = this.$refs.payPalButtons.querySelectorAll('.skeleton')

            for (const skeleton of skeletons) {
              skeleton.remove()
            }
          }

          paypal
            ?.Buttons?.({
            async createOrder() {
              try {
                const response = await fetch(payPal.routes.create, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                })

                const orderData = await response.json()

                if (orderData.id) {
                  return orderData.id
                } else {
                  const errorDetail = orderData?.details?.[0]
                  const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : JSON.stringify(orderData)

                  throw new Error(errorMessage)
                }
              } catch (error) {
                if (error instanceof Error) {
                  component.errors.payPal = error.message

                  return
                }

                alert(error)
              }
            },
            // Three cases to handle:
            //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
            //   (2) Other non-recoverable errors -> Show a failure message
            //   (3) Successful transaction -> Show confirmation or thank you message
            async onApprove(data, actions) {
              try {
                // TODO: origin is like this, but should be 3001. Current vite proxy hits routes twice
                const response = await fetch(new URL(`${payPal.routes.capture}?order_id=${data.orderID}`, window.location.origin), {
                  method: 'GET',
                })
                const orderData = await response.json()
                const errorDetail = orderData?.details?.[0]

                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
                  return actions.restart()
                }
                // (2) Other non-recoverable errors -> Show a failure message
                else if (errorDetail) {
                  throw new Error(`${errorDetail.description} (${orderData.debug_id})`)
                } else if (!orderData.purchase_units) {
                  throw new Error(JSON.stringify(orderData))
                }
                /**
                 * (3) Successful transaction -> Show confirmation or thank you message
                 * Or go to another URL:  actions.redirect('thank_you.html');
                 */
                else {
                  component.onPayPalCompleted()
                }
              } catch (error) {
                console.error(error)
                component.errors.payPal = 'Stala se neočekávaná chyba při placení přes PayPal. Zkuste to znovu za chvíli nebo nás kontaktujte.'
              }
            },
          })
            .render(buttonRoot)
            .catch((error) => {
              component.errors.payPal = `Stala se neočekávaná chyba při kontaktování PayPal. Zkuste to znovu za chvíli nebo nás kontaktujte. (${error.message})`
            })
        })
        .catch((error) => {
          console.error('failed to load the PayPal JS SDK script', error)
        })
    },
  }
}