import { AlpineComponent } from 'alpinejs'

const PACKETA_TOKEN = '5d7032d2392ceefd'

export default function cartForm(initialData: any): AlpineComponent<any> {
  const initialState = {
    form: {
      errors: {},
    },
  }

  let formFieldsDefaults = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    street: '',
    houseNumber: '',
    city: '',
    postalCode: '',
    note: '',
    paymentMethod: 'gopay',
    shippingMethod: 'dpd',
    shippingMetadata: null as null | object,
  }

  if (initialData) {
    try {
      const parsedInitialData = JSON.parse(initialData)
      formFieldsDefaults = {
        ...formFieldsDefaults,
        ...parsedInitialData?.state?.form?.values,
      }

      initialState.form.errors = {
        ...initialState.form.errors,
        ...parsedInitialData?.state?.form?.errors,
      }
    } catch (error) {
      console.error('failed to parse initial data into cartForm:')
      console.error(error)
    }
  }

  console.log('started cart form with these inputs: ')
  console.log({
    formFieldsDefaults,
    initialState,
  })

  return {
    ...formFieldsDefaults,
    state: initialState,

    showZasilkovnaSelect() {
      const component = this

      window.Packeta.Widget.pick(PACKETA_TOKEN, (ep) => {
        component.shippingMetadata = {
          name: ep.name,
          zip: ep.zip,
        }
      })
    },
    onSubmit(event) {
      event.preventDefault()
    },
  }
}