
export type ArrayAttributesProps = {
  name: string
  url: string
}

export type ArrayEffectsProps = {
  effect: string
  language: {
    name: string
    url: string
  },
  // eslint-disable-next-line camelcase
  short_effect: string
}

export type ItemSchema = {
  name: string
  url: string
}
