import ajvFormats from 'ajv-formats'
import Ajv from 'ajv'

const ajv = new Ajv({ allErrors: true })

ajvFormats(ajv)

export { ajv }