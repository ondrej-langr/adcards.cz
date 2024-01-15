import { AlpineComponent } from 'alpinejs'
import Cropper from 'cropperjs'
import { util, z } from 'zod'
import Omit = util.Omit

type CardBuilderProps = z.output<typeof cardBuilderPropsSchema>;
type ComponentState = {
    _name: string | null,
    _stats: any | null,

    //
    errors: CardBuilderProps['state']['form']['errors'],

    //
    bonuses: Record<string, any>,
    toggleBonus(bonusName: string): void

    //
    _rating: number | null,
    getRating(): number,

    //
    _position: string | null,
    getPosition(): string,

    //
    _backgroundId: number | null,
    getBackground(): CardBackground | null,
    setBackground(backgroundId: NonNullable<ComponentState['_backgroundId']>, pushSteps?: boolean): void,

    //
    _sizeId: number | null,
    getSize(): MaterialSize | null,
    setSize(sizeId: NonNullable<ComponentState['_sizeId']>): void,
    sizeToLabel(size?: MaterialSize | null): string

    //
    _sportId: number | null,
    getSport(): (Omit<Sport, 'backgrounds'> & { backgrounds: Map<CardBackground['id'], CardBackground> }) | null,
    setSport(sportId: Sport['id'], pushSteps?: boolean): void,

    //
    _materialId: number | null,
    getMaterial(): (Omit<Material, 'sizes'> & { sizes: Map<MaterialSize['id'], MaterialSize> }) | null,
    setMaterial(materialId: Material['id'], pushSteps?: boolean): void,

    //
    _cardType: string | null,
    getCardType(): ComponentState['_cardType'],
    setCardType(cardType: NonNullable<ComponentState['_cardType']>): void,
    isNormalPlayer(): boolean
    isManager(): boolean
    isGoalKeeper(): boolean

    //
    _playerImage: string | null,
    handlePlayerImageUpload(event: Event): void,

    //
    _step: { current: number, largestTaken: number },
    getLargestTakenStep(): number,
    getCurrentStep(): number,
    selectStep(step: number): void,
    goNextStep(): void,

    //
    _country: Country | null,
    getCountry(): ComponentState['_country'],
    setCountry(country: NonNullable<ComponentState['_country']>): void,

    //
    _club: Club | null,
    getClub(): ComponentState['_club'],
    handleClubUpload(event: Event): void,

    //
    handleSubmit(event: SubmitEvent): void
    doValidate(doNotAddErrorToFields?: boolean): boolean

    //
    getTotalPrice(): string

    //
    updateSearchParamsWithState(): void
    updateStateWithSearchParams(): void
}
type Country = z.infer<typeof countrySchema>
type Club = z.infer<typeof clubSchema>
type Material = z.infer<typeof materialSchema>
type MaterialSize = z.infer<typeof materialSizeSchema>
type CardBackground = z.infer<typeof cardBackgroundSchema>
type Sport = z.infer<typeof sportSchema>

const zodNumeric = z.number().or(z.string()).transform(Number)
const materialSizeSchema = z.object({ id: zodNumeric, width: z.number(), height: z.number(), price: z.number() })
const materialSchema = z.object({
    id: zodNumeric,
    bonuses: z.object({
        data: z.array(z.object({ name: z.string(), price: z.number() })),
    }),
    sizes: z.array(materialSizeSchema),
})
const cardBackgroundSchema = z.object({ id: zodNumeric, name: z.string(), imageSrc: z.string(), textColor: z.object({ value: z.string() }).partial() })
const sportSchema = z.object({
    id: zodNumeric,
    backgrounds: z.array(cardBackgroundSchema),
})
const clubSchema = z.object({ fileContent: z.string(), fileName: z.string() })
const countrySchema = z.object({ id: zodNumeric, name: z.string(), flag: z.object({ src: z.string() }).optional() })
const cardBuilderPropsSchema = z.object({
    materials: z.array(materialSchema),
    sports: z.array(sportSchema),

    state: z.object({
        form: z.object({
            values: z.object({
                sizeId: zodNumeric,
                materialId: zodNumeric,
                sportId: zodNumeric,
                backgroundId: zodNumeric,
                rating: zodNumeric,
                position: z.string(),
                cardType: z.string(),
                country: countrySchema,
                currentStep: z.number(),
                name: z.string(),
                stats: z.any(),
                playerImage: z.string(),
                bonuses: z.record(z.string()),
            }).partial().default({}),
            // Transform if for the case when server returns empty keyed array which in json is array instead of object
            errors: z.record(z.string()).or(z.array(z.string())).transform((value) => Array.isArray(value) ? {} : value),
            // Transform if for the case when server returns empty keyed array which in json is array instead of object
            successes: z.record(z.string()).or(z.array(z.string())).transform((value) => Array.isArray(value) ? {} : value),
        }),
    }),
})

const FILL_FIELD_MESSAGE = 'Vyplňte'
const zodStringOptions = { required_error: FILL_FIELD_MESSAGE, invalid_type_error: FILL_FIELD_MESSAGE }

const formValidationSchema = z.object({
    name: z.string(zodStringOptions).min(1, FILL_FIELD_MESSAGE),
    countryId: z.number(zodStringOptions).min(1, FILL_FIELD_MESSAGE),
    club: z.string(zodStringOptions).min(1, FILL_FIELD_MESSAGE),
    playerImage: z.string(zodStringOptions).min(1, FILL_FIELD_MESSAGE),
    rating: z.number(),
    position: z.string(),
    stats: z.array(z.object({
        name: z.string().min(1, FILL_FIELD_MESSAGE),
        value: z.number().default(99),
    })).min(6).max(6).optional(),
    bonuses: z.record(z.string(), z.string().min(1, FILL_FIELD_MESSAGE)).optional(),
})

export default function cardBuilder(rawProps: CardBuilderProps): AlpineComponent<ComponentState> {
    const propsValidation = cardBuilderPropsSchema.safeParse(rawProps)
    if (!propsValidation.success) {
        console.log(propsValidation)
        throw new Error('Card builder was run without initial data on window.application.builder! You may used builder outside of its page')
    }

    const { data: props } = propsValidation
    let cropperImage: Element | null = null
    let cropper: Cropper | null = null

    const materialsAsMap = new Map(props.materials.map((material) => [material.id, {
        ...material,
        sizes: new Map(material.sizes?.map(size => [size.id, size])),
    }]))

    const sportsAsMap = new Map(props.sports.map((sport) => [sport.id, {
        ...sport,
        backgrounds: new Map(sport.backgrounds.map(background => [background.id, background])),
    }]))

    const initialFormValues = props.state.form.values ?? {}

    // actual state
    return {
        _name: initialFormValues.name ?? '',
        _stats: initialFormValues.stats ?? null,

        errors: props.state.form.errors,

        bonuses: initialFormValues.bonuses ?? {},
        toggleBonus(bonusName) {
            let newBonuses = { ...this.bonuses }

            if (bonusName in this.bonuses) {
                delete newBonuses[bonusName]
            } else {
                newBonuses[bonusName] = ''
            }

            this.bonuses = newBonuses
        },

        _rating: initialFormValues.rating ?? null,
        getRating() {
            return this._rating ?? 99
        },

        _position: initialFormValues.position ?? null,
        getPosition() {
            return this._position ?? 'CAM'
        },

        _backgroundId: initialFormValues.backgroundId ?? null,
        getBackground() {
            const selectedSport = this.getSport()

            if (!selectedSport || this._backgroundId === null) {
                return null
            }

            return selectedSport.backgrounds.get(this._backgroundId) ?? null
        },
        setBackground(backgroundId, goNext = false) {
            const selectedSport = this.getSport()

            if (!selectedSport || !selectedSport.backgrounds.has(backgroundId)) {
                throw new Error('Material must be selected first')
            }

            this._backgroundId = backgroundId

            if (goNext) {
                this.goNextStep()
            }

            this.updateSearchParamsWithState()
        },

        _sizeId: initialFormValues.sizeId ?? null,
        getSize() {
            const selectedMaterial = this.getMaterial()

            if (!selectedMaterial || this._sizeId === null) {
                return null
            }

            return selectedMaterial.sizes.get(this._sizeId) ?? null
        },
        setSize(sizeId: number) {
            const selectedMaterial = this.getMaterial()

            if (!selectedMaterial || !selectedMaterial.sizes.has(sizeId)) {
                throw new Error('Material must be selected first')
            }

            this._sizeId = sizeId
        },
        sizeToLabel(size): string {
            if (size === undefined || size === null) {
                return ''
            }

            return `${size.width}x${size.height}cm`
        },

        _sportId: initialFormValues.sportId ?? null,
        getSport() {
            if (!this._sportId) {
                return null
            }

            return sportsAsMap.get(this._sportId) ?? null
        },
        setSport(sportId, goNext) {
            if (!sportsAsMap.has(sportId)) {
                throw new Error('Invalid sport with id ' + sportId)
            }

            this._sportId = sportId

            if (goNext) {
                this.goNextStep()
            }

            this.updateSearchParamsWithState()
        },

        _materialId: initialFormValues.materialId ?? null,
        getMaterial() {
            if (!this._materialId) {
                return null
            }

            return materialsAsMap.get(this._materialId) ?? null
        },
        setMaterial(materialId, goNext) {
            if (this._materialId !== (materialId)) {
                this.bonuses = {}
            }

            this._materialId = materialId

            const material = materialsAsMap.get(materialId)
            if (!material || !material.sizes) {
                throw new Error('Material by id not found or material has no sizes which is caused by backend')
            }

            this._sizeId = [...material.sizes.values()][0].id
            this.updateSearchParamsWithState()

            if (goNext) {
                this.goNextStep()
            }
        },

        _cardType: initialFormValues.cardType ?? null,
        getCardType() {
            return this._cardType
        },
        setCardType(cardType) {
            this._cardType = cardType
        },
        isNormalPlayer() {
            return this._cardType === 'player'
        },
        isGoalKeeper() {
            return this._cardType === 'goalKeeper'
        },
        isManager() {
            return this._cardType === 'manager'
        },

        _playerImage: initialFormValues.playerImage ?? null,
        handlePlayerImageUpload(event: Event) {
            const target = event.target

            if (!target || !(target instanceof HTMLInputElement) || !target?.files?.length) {
                console.warn('No event target or files or event target is not an input element')

                return
            }

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

        _step: { current: initialFormValues.currentStep ?? 0, largestTaken: initialFormValues.currentStep ?? 0 },
        getLargestTakenStep() {
            return this._step.largestTaken
        },
        getCurrentStep() {
            return this._step.current
        },
        selectStep(_nextValue) {
            // Clamp step value so it does not overflow
            const nextValue = Math.min(3, Math.max(0, _nextValue))
            console.log({ nextValue })

            if (nextValue > this._step.largestTaken) {
                this._step.largestTaken = nextValue
            }

            this._step.current = nextValue
        },
        goNextStep() {
            console.log('next step')
            this.selectStep(this.getCurrentStep() + 1)
        },

        _country: initialFormValues.country ?? null,
        getCountry() {
            return this._country
        },
        setCountry(country) {
            this._country = country
            this.doValidate()
        },

        _club: null,
        getClub() {
            return this._club
        },
        handleClubUpload(event) {
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

                component._club = {
                    fileName,
                    fileContent: resultSrc.toString(),
                }

                this.doValidate()
            }

            reader.readAsDataURL(target.files[0])
        },

        doValidate(doNotAddErrorToFields) {
            const formValues: Record<any, any> = {
                name: this._name,
                countryId: this._country?.id,
                club: this._club?.fileContent,
                playerImage: this._playerImage,
                rating: this.getRating(),
                position: this.getPosition(),
            }
            const isManager = this._cardType === 'manager'
            const isGoalKeeper = this._cardType === 'goalKeeper'

            if (!isManager) {
                formValues.stats = isGoalKeeper ? this._stats.goalKeeper : this._stats.player
                formValues.stats = formValues.stats.map((row) => ({ ...row, value: Number(row.value) }))
            }

            if (Object.keys(this.bonuses).length) {
                formValues.bonuses = this.bonuses
            }

            const validationResponse = formValidationSchema.safeParse(formValues)
            this.errors = {}

            if (!doNotAddErrorToFields) {
                if (!validationResponse.success) {
                    console.log(validationResponse.error.errors)
                    for (const errorItem of validationResponse.error.errors) {
                        this.errors ??= {}

                        this.errors[errorItem.path.join('.')] = errorItem.message
                    }
                } else {
                    if (!isManager) {
                        this._stats[isGoalKeeper ? 'goalKeeper' : 'player'] = validationResponse.data.stats
                    }

                    this._rating = validationResponse.data.rating
                    this._position = validationResponse.data.position
                }
            }

            return validationResponse.success
        },

        getTotalPrice() {
            const size = this.getSize()
            let totalPrice = size?.price ?? 0

            const specifiedBonuses = this.getMaterial()?.bonuses?.data
            if (specifiedBonuses) {
                for (const bonus of specifiedBonuses) {
                    if (bonus.name in this.bonuses) {
                        totalPrice += bonus.price
                    }
                }
            }

            return totalPrice + 'Kč'
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
                    component._playerImage = cropper?.getCroppedCanvas().toDataURL() ?? component._playerImage

                    this.doValidate()
                })

                cropperImage.addEventListener('cropend', () => {
                    component._playerImage = cropper?.getCroppedCanvas().toDataURL() ?? component._playerImage
                    this.doValidate()
                })
            }

            // Attach popstate event (eq when user goes back or forward on page as that should update state with whats in browser search params)
            window.addEventListener('popstate', (event) => {
                if (document.location.pathname === '/karty/builder') {
                    this.updateStateWithSearchParams()
                }
            })
        },

        /**
         * This actually behaves like a "middleware" that checks fields before sending it to server
         */
        handleSubmit(event) {
            console.log(event)

            if (!this.doValidate()) {
                event.stopImmediatePropagation()
                event.preventDefault()

            }
        },

        updateStateWithSearchParams() {
            const searchParams = new URLSearchParams(document.location.search)

            let nextStepCount = 0
            const fieldsFromUrl = ['backgroundId', 'materialId', 'sportId']
            for (const fieldName of fieldsFromUrl) {
                this[`_${fieldName}`] = searchParams.get(fieldName) ?? ''

                if (!!this[`_${fieldName}`]) {
                    nextStepCount++
                }
            }

            this._step.current = nextStepCount
            this._step.largestTaken = nextStepCount
        },
        updateSearchParamsWithState() {
            const { _backgroundId: backgroundId, _materialId: materialId, _sportId: sportId } = this
            const nextSearch = new URLSearchParams(window.location.search)

            for (const [key, value] of Object.entries({ backgroundId, materialId, sportId })) {
                if (value) {
                    nextSearch.set(key, String(value))
                }
            }

            history.pushState(null, '', window.location.pathname + '?' + nextSearch.toString())
        },
    }
}