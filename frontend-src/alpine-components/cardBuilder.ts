import { AlpineComponent } from 'alpinejs'
import Cropper from 'cropperjs'
import { z } from 'zod'

const builderStateSchema = z.object({
  materialId: z.string().transform((item) => {
    if (!window.application.builder?.materials.map(item => String(item.id)).includes(item)) {
      return undefined
    }

    return item
  }),
  backgroundId: z.string().transform((item) => {
    if (!window.application.builder?.backgrounds.map(item => String(item.id)).includes(item)) {
      return undefined
    }

    return item
  }),
  sportId: z.string().transform((item) => {
    if (!window.application.builder?.sports.map(item => String(item.id)).includes(item)) {
      return undefined
    }

    return item
  }),
  countryId: z.string().transform((item) => {
    if (!window.application.builder?.countries.map(item => item.id).includes(item)) {
      return undefined
    }

    return item
  }),
  sizeId: z.string().transform((item) => {
    if (!window.application.builder?.sizes.map(item => String(item.id)).includes(item)) {
      return undefined
    }

    return item
  }),
  name: z.string(),

  stats: z.any().nullable().default(null),
  cardType: z.string().nullable().default(null),
  rating: z.string().nullable().default(null),
  position: z.string().nullable().default(null),
  playerImage: z.string().nullable().default(null),
})

type BuilderDataOnWindow = NonNullable<typeof window.application.builder>

type State = z.output<typeof builderStateSchema> & Omit<BuilderDataOnWindow, 'defaultValues'> & {
  // goNext(): void
  _backgroundId: string,
  _materialId: string,
  _sportId: string,
  currentStep: number;
  getActiveBackground(): object | undefined
  getActiveSizeAsLabel(): string
  getTotalPrice(): string
  updateSearchParamsWithState(): void
  getActiveCountry(): void
  isRealPlayer(): boolean
  getActiveSize(): any
  readPlayerImage(event: Event): void
  imageUploaderOpen: boolean
  onSubmit(event: SubmitEvent): void
  _step: { current: number, largestStepTaken: number }
}

export default function cardBuilder(): AlpineComponent<State> {
  if (!window.application.builder) {
    throw new Error('Card builder was run without initial data on window.application.builder! You may used builder outside of its page')
  }

  const initialState = builderStateSchema.partial().parse(window.application.builder.initialValues)

  let cropperImage: Element | null = null
  let cropper: Cropper | null = null
  let initialStep = 0

  // TODO: move this logic inside server for improved UX (user sees first step always with this logic as javascript takes some time to load)
  if (!!initialState.materialId && !initialState.sportId) {
    initialStep = 1
  } else if (!!initialState.materialId && !!initialState.sportId && !initialState.backgroundId) {
    initialStep = 2
  } else if (!!initialState.materialId && !!initialState.sportId && !!initialState.backgroundId) {
    initialStep = 3
  }

  // actual state
  return {
    ...window.application.builder!,
    _step: { current: initialStep, largestStepTaken: initialStep },
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
        })

        cropperImage.addEventListener('cropend', () => {
          component.playerImage = cropper?.getCroppedCanvas().toDataURL() ?? component.playerImage
        })
      }
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

    _backgroundId: initialState.backgroundId ?? '',
    get backgroundId() {
      return this._backgroundId
    },
    set backgroundId(nextValue: string) {
      this._backgroundId = nextValue
      this.updateSearchParamsWithState()
    },

    _materialId: initialState.materialId ?? '',
    get materialId() {
      return this._materialId
    },
    set materialId(nextValue: string) {
      this._materialId = nextValue
      this.updateSearchParamsWithState()
    },

    _sportId: initialState.sportId ?? '',
    get sportId() {
      return this._sportId
    },
    set sportId(nextValue: string) {
      this._sportId = nextValue
      this.updateSearchParamsWithState()
    },

    cardType: initialState.cardType ?? null,
    countryId: initialState.countryId ?? '',
    name: initialState.name ?? '',
    stats: initialState.stats ?? null,
    rating: initialState.rating ?? null,
    sizeId: String(initialState.sizeId ?? ''),
    position: initialState.position ?? '',
    imageUploaderOpen: false,
    playerImage: '',
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

      event.preventDefault()
    },
  }
}