import { AlpineComponent } from 'alpinejs'

const PACKETA_TOKEN = '5d7032d2392ceefd'

export default function cartForm(): AlpineComponent<any> {
  return {
    // TODO
    paymentMethod: 'gopay',
    shippingMethod: 'dpd',
    shippingMetadata: null as null | object,
    showZasilkovnaSelect() {
      const component = this

      window.Packeta.Widget.pick(PACKETA_TOKEN, (ep) => {
        component.shippingMetadata = {
          name: ep.name,
          zip: ep.zip,
        }
      })
    },
  }
}