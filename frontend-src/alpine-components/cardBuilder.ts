import { AlpineComponent } from 'alpinejs'
import { z } from "zod"

const builderStateSchema = z.object({
  materialId: z.string().transform((item) => {
    if (!window.application.builder?.materialIds.includes(item)) {
      return undefined
    }

    return item
  }),
  backgroundId: z.string().transform((item) => {
    if (!window.application.builder?.backgroundIds.includes(item)) {
      return undefined
    }

    return item
  }),
  countryId: z.string().transform((item) => {
    if (!window.application.builder?.countryIds.includes(item)) {
      return undefined
    }

    return item
  }),
  name: z.string(),

  stats: z.string().nullable().default(null),
  cardType: z.string().nullable().default(null),
  rating: z.number().nullable().default(null),
})

type State = z.output<typeof builderStateSchema> & {
  // goNext(): void
}

export default  function cardBuilder (): AlpineComponent<State> {
  // init
  const rawInitialState = new URLSearchParams(window.location.search);
  const initialState = builderStateSchema.partial().parse({ ...rawInitialState.entries() })

  // actual state
  return {
    cardType: initialState.cardType ?? null,
    backgroundId: initialState.backgroundId ?? "",
    countryId: initialState.countryId ?? "",
    name: initialState.name ?? "",
    stats: initialState.stats ?? null,
    rating: initialState.rating ?? null,
    materialId: initialState.materialId ?? "",
  }
}