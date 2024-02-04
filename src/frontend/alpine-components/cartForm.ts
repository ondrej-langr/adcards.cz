import { AlpineComponent } from 'alpinejs'
import { loadScript } from '@paypal/paypal-js'
import { ajv } from '../lib/ajv'
import pickFromObjectBy from 'lodash/pickBy'
import { z } from 'zod'

const PACKETA_TOKEN = '5d7032d2392ceefd'
const FORM_FIELD_DEFAULTS = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    street: '',
    houseNumber: '',
    city: '',
    postalCode: '',
    note: '',
    paymentMethod: 'paypal',
    shippingMethod: 'dpd',
    shippingMetadata: null as null | object,
}
const FORM_FIELD_KEYS = Object.keys(FORM_FIELD_DEFAULTS) as (keyof typeof FORM_FIELD_DEFAULTS)[]

type FORM_FIELD_NAMES = typeof FORM_FIELD_KEYS[number]
type FormData = Partial<Omit<Record<FORM_FIELD_NAMES, string>, 'shippingMetadata'>> & {
    shippingMetadata?: {}
};

const cartFormPropsSchema = z.object({
    initialData: z.any(),
    validationSchema: z.record(z.string(), z.any()),
    errorMessagesForRequiredFields: z.record(z.string(), z.string()),
    cart: z.object({
        total: z.object({
            withPromo: z.number(),
            withoutPromo: z.number(),
        }),
    }),
    shippingMethods: z.record(z.string(), z.object({
        rate: z.number(),
        title: z.string(),
        metadataRequiredFields: z.array(z.string()).optional(),
    })),
})

type CartFormProps = z.infer<typeof cartFormPropsSchema>

export default function cartForm(props: CartFormProps): AlpineComponent<any> {
    if (!cartFormPropsSchema.safeParse(props).success) {
        throw new Error('Cannot start cartForm since it does not have necessary props according to schema')
    }

    const { validationSchema, initialData, shippingMethods, cart, errorMessagesForRequiredFields } = props

    let initialFormValues = { ...FORM_FIELD_DEFAULTS }
    const doValidate = ajv.compile(validationSchema)
    const initialState = {
        form: {
            errors: {},
        },
    }

    if (initialData) {
        try {
            const parsedInitialData = initialData
            initialFormValues = {
                ...initialFormValues,
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
        initialFormValues,
        initialState,
    })

    return {
        ...initialFormValues,
        state: initialState,

        getShippingRate() {
            const shippingMethod = this.getFormValues()['shippingMethod']
            if (!shippingMethod) {
                return 0
            }

            const shipping = shippingMethods[shippingMethod]
            return shipping.rate
        },

        getFormValues(): FormData {
            // We need to extract form values this way from "this" as "this" is Proxy
            const formValues: FormData = {}
            for (const key of FORM_FIELD_KEYS) {
                const value = this[key]

                // None of values should be boolean, null, undefined or empty strings
                if (!value) {
                    continue
                }

                formValues[key] = value
            }

            return formValues
        },

        doValidate(doNotAddErrorToFields?: boolean) {
            const formValues = this.getFormValues()
            const isValid = doValidate(formValues)

            if (!doNotAddErrorToFields) {
                const formErrors = this.state.form.errors
                for (const fieldKey of FORM_FIELD_KEYS) {
                    formErrors[fieldKey] = null
                }

                if (!isValid) {
                    for (const errorItem of doValidate.errors ?? []) {

                        if (errorItem.params.missingProperty) {
                            const fieldName = errorItem.params.missingProperty

                            formErrors[fieldName] = errorMessagesForRequiredFields[fieldName] ?? errorMessagesForRequiredFields['*'] ?? errorItem.message
                        }
                    }
                }
            }

            return isValid
        },

        get isValid() {
            return this.doValidate(true)
        },

        showZasilkovnaSelect() {
            const component = this

            window.Packeta.Widget.pick(PACKETA_TOKEN, (ep) => {
                component.shippingMetadata = {
                    name: ep.name,
                    zip: ep.zip,
                }
                component.doValidate()
            })
        },

        onSubmit(event) {
            event.preventDefault()
        },

        init() {
            const appCartRoot = document.getElementById('app-cart')
            const cartFormRoot = document.getElementById('cart-form')


            if (appCartRoot) {
                window.document.body.addEventListener('htmx:beforeRequest', (event) => {
                    if ((event as any).detail.elt === cartFormRoot) {
                        appCartRoot.classList.add('htmx-request')
                    }
                })
                window.document.body.addEventListener('htmx:afterRequest', (event) => {
                    if ((event as any).detail.elt === cartFormRoot) {
                        appCartRoot.classList.remove('htmx-request')
                    }
                })
            }
        },
    }
}