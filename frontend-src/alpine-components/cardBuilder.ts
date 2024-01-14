import { AlpineComponent } from 'alpinejs'
import Cropper from 'cropperjs'
import { z } from 'zod'
import { ajv } from '../lib/ajv'

const builderStateSchema = z.object({
  materialId: z.string().optional(),
  backgroundId: z.string().optional(),
  sportId: z.string().optional(),
  countryId: z.string().optional(),
  sizeId: z.string().nullable().default(null),
  name: z.string(),
  stats: z.any().nullable().default(null),
  cardType: z.string().nullable().default(null),
  rating: z.string().nullable().default(null),
  position: z.string().nullable().default(null),
  playerImage: z.string().nullable().default(null),
  currentStep: z.number().min(0),
})

type BuilderDataOnWindow = NonNullable<typeof window.application.builder>

type State = z.output<typeof builderStateSchema> & Omit<BuilderDataOnWindow, 'defaultValues'> & {
  // goNext(): void
  _backgroundId: string,
  _materialId: string,
  _sportId: string,
  _clubImageName: string,
  clubImage?: string,
  getActiveBackground(): object | undefined
  getActiveSizeAsLabel(): string
  getTotalPrice(): string
  updateSearchParamsWithState(): void
  getActiveCountry(): void
  isRealPlayer(): boolean
  getActiveSize(): any
  readPlayerImage(event: Event): void
  onClubUpload(event: Event): void
  imageUploaderOpen: boolean
  onSubmit(event: SubmitEvent): void
  _step: { current: number, largestStepTaken: number }
  _country?: undefined | BuilderDataOnWindow['countries'][number]
  _countryFlagSrc?: undefined | string;
  _countryName?: string;
  setCountry(param: any): void;
  doValidate(doNotAddErrorToFields?: boolean): boolean
}

export default function cardBuilder(): AlpineComponent<State> {
  const builderValues = window.application.builder

  if (!builderValues) {
    throw new Error('Card builder was run without initial data on window.application.builder! You may used builder outside of its page')
  }

  const initialState = builderStateSchema.partial().parse(builderValues.state.form.values)

  const schema = z.object({
    name: z.string({ required_error: 'Vyplňte' }).min(1, 'Vyplňte'),
    countryId: z.string({ required_error: 'Vyplňte' }).min(1, 'Vyplňte'),
    club: z.string({ required_error: 'Vyplňte' }).min(1, 'Vyplňte'),
    playerImage: z.string({ required_error: 'Vyplňte' }).min(1, 'Vyplňte'),
    rating: z.number({ required_error: 'Vyplňte' }).default(99),
    position: z.string({ required_error: 'Vyplňte' }).default('CAM'),
    stats: z.array(z.object({
      name: z.string().min(1, 'Vyplňte'),
      value: z.number().default(99),
    })).min(6).max(6).optional(),
  })

  let cropperImage: Element | null = null
  let cropper: Cropper | null = null

  // actual state
  return {
    ...window.application.builder!,
    _step: { current: initialState.currentStep ?? 0, largestStepTaken: initialState.currentStep ?? 0 },
    _countryFlagSrc: undefined,
    _countryName: undefined,
    _clubImageName: 'Kliknutím nahrajte klub',
    clubImage: undefined,
    cardType: initialState.cardType ?? null,
    countryId: initialState.countryId ?? '',
    name: initialState.name ?? '',
    stats: initialState.stats ?? null,
    rating: initialState.rating ?? null,
    sizeId: String(initialState.sizeId ?? ''),
    position: initialState.position ?? '',
    imageUploaderOpen: false,
    playerImage: '',
    _backgroundId: initialState.backgroundId ?? '',
    _materialId: initialState.materialId ?? '',
    _sportId: initialState.sportId ?? '',
    state: {
      form: {
        errors: {},
      },
    },

    onClubUpload(event) {
      const target = event.target

      if (!target || !(target instanceof HTMLInputElement) || !target?.files?.length) {
        console.warn('No event target or files or event target is not an input element')

        return
      }

      let fileName = target.files?.[0].name
      let reader = new FileReader()
      const component = this

      reader.onload = (onLoadImageEvent) => {
        const resultSrc = onLoadImageEvent.target?.result


        if (!resultSrc) {
          throw new Error('No result after onLoad on user uploaded image')
        }

        component._clubImageName = fileName
        component.clubImage = resultSrc.toString()
      }

      reader.readAsDataURL(target.files[0])

      this.doValidate()
    },
    setCountry(country) {
      this.countryId = country.id
      this._countryName = country.name
      console.log({ country })

      if (country.flag?.src) {
        this._countryFlagSrc = country.flag.src
      } else {
        this._countryFlagSrc = undefined
      }

      this.doValidate()
    },
    get largestStepTaken() {
      return this._step.largestStepTaken
    },
    get currentStep() {
      return this._step.current
    },
    set currentStep(nextValue) {
      if (nextValue > this._step.largestStepTaken) {
        this._step.largestStepTaken = nextValue
      }

      this._step.current = nextValue
    },
    doValidate(doNotAddErrorToFields) {
      const formValues: Record<any, any> = {
        name: this.name,
        countryId: this.countryId,
        club: this.clubImage,
        playerImage: this.playerImage,
        rating: Number(this.rating),
        position: this.position,
      }

      if (this.cardType !== 'manager') {
        formValues.stats = this.cardType === 'goalKeeper' ? this.stats.goalKeeper : this.stats.player

        formValues.stats = formValues.stats.map((row) => ({ ...row, value: Number(row.value) }))
      }

      const validationResponse = schema.safeParse(formValues)
      this.state.form.errors = {}

      if (!doNotAddErrorToFields) {
        if (!validationResponse.success) {
          console.log(validationResponse.error.errors)
          for (const errorItem of validationResponse.error.errors) {
            this.state.form.errors ??= {}

            this.state.form.errors[errorItem.path.join('.')] = errorItem.message
          }
        } else {
          if (this.cardType !== 'manager') {
            this.stats[this.cardType === 'goalKeeper' ? 'goalKeeper' : 'player'] = validationResponse.data.stats
          }

          this.rating = String(validationResponse.data.rating)
          this.position = validationResponse.data.position
        }
      }

      return validationResponse.success
    },
    get isFormValid() {
      let requiredFields: any[] = []

      if (this.cardType !== 'realPlayer') {
        requiredFields = [this.backgroundId, this.name, this.countryId, this.playerImage, this.rating, this.position, this.cardType, this.sizeId]
      } else {
        requiredFields = [this.backgroundId, this.name, this.sizeId]
      }

      let valid = !0

      requiredFields.map(field => {
        if (field === null || field == '' || field === undefined) {
          valid = !1
          return
        }
      })

      return valid
    },
    updateSearchParamsWithState() {
      const { backgroundId, materialId, sportId } = this
      const nextSearch = new URLSearchParams(window.location.search)

      for (const [key, value] of Object.entries({ backgroundId, materialId, sportId })) {
        if (value) {
          nextSearch.set(key, String(value))
        }
      }

      history.pushState(null, '', window.location.pathname + '?' + nextSearch.toString())
    },

    get backgroundId() {
      return this._backgroundId
    },
    set backgroundId(nextValue: string) {
      this._backgroundId = nextValue
      this.updateSearchParamsWithState()
    },
    get materialId() {
      return this._materialId
    },
    set materialId(nextValue: string) {
      this._materialId = nextValue

      const material = builderValues.materials.find((item) => item.id === nextValue)
      if (!material || !material.sizes) {
        throw new Error('Material by id not found or material has no sizes')
      }

      this.sizeId = material.sizes?.[0].id

      this.updateSearchParamsWithState()
    },
    get sportId() {
      return this._sportId
    },
    set sportId(nextValue: string) {
      this._sportId = nextValue
      this.updateSearchParamsWithState()
    },
    getActiveBackground() {
      if (!this.backgroundId) {
        return
      }

      return this.backgrounds.find(item => String(item.id) === String(this.backgroundId))
    },
    getActiveCountry() {
      if (!this.countryId) {
        return
      }

      return this.countries.find(item => String(item.id) === String(this.countryId))
    },
    getActiveSizeAsLabel() {
      if (!this.sizeId) {
        return ''
      }

      const size = this.getActiveSize()

      if (!size) {
        console.warn(`Could not find size under id ${this.sizeId}`)
        return ''
      }

      return `${size!.width}x${size!.height}cm`
    },
    getActiveSize() {
      if (!this.sizeId) {
        return ''
      }

      return this.sizes.find(item => String(item.id) === String(this.sizeId))!
    },
    getTotalPrice() {
      const size = this.getActiveSize()

      return size.price + 'Kč'
    },
    readPlayerImage(event) {
      const target = event.target

      if (!target || !(target instanceof HTMLInputElement) || !target?.files?.length) {
        console.warn('No event target or files or event target is not an input element')

        return
      }

      const component = this

      let img = new Image()
      let fileName = target.files?.[0].name
      let reader = new FileReader()

      reader.onload = function(onLoadImageEvent) {
        const resultSrc = onLoadImageEvent.target?.result

        if (!resultSrc) {
          throw new Error('No result after onLoad on user uploaded image')
        }

        cropper?.replace(resultSrc.toString())

        img.src = resultSrc.toString()

        let containerEl = document.createElement('div')
        let imgEl = document.createElement('img')
        let labelEl = document.createElement('span')

        containerEl.classList.add('dropdown-icon-container')

        imgEl.src = img.src
        imgEl.classList.add('dropdown-icon')

        labelEl.classList.add('label-name')
        labelEl.innerHTML = fileName

        containerEl.appendChild(imgEl)
        containerEl.appendChild(labelEl)
      }

      reader.readAsDataURL(target.files[0])

    },
    isRealPlayer() {
      return this.cardType === 'realPlayer'
    },
    /**
     * This actually behaves like a "middleware" that checks fields before sending it to server
     */
    onSubmit(event) {
      console.log(event)

      if (!this.doValidate()) {
        event.stopImmediatePropagation()
        event.preventDefault()

      }
    },
    init() {
      const component = this

      cropperImage = document.querySelector('.image-preview')

      if (cropperImage && (cropperImage instanceof HTMLImageElement)) {
        cropper = new Cropper(cropperImage, {
          preview: '#card-image',
          zoomOnWheel: !0,
          background: !0,
          restore: !1,
          responsive: !0,
          cropBoxResizable: !0,
        })

        cropperImage.addEventListener('ready', () => {
          component.playerImage = cropper?.getCroppedCanvas().toDataURL() ?? component.playerImage

          this.doValidate()
        })

        cropperImage.addEventListener('cropend', () => {
          component.playerImage = cropper?.getCroppedCanvas().toDataURL() ?? component.playerImage
          this.doValidate()
        })
      }
    },
  }
}