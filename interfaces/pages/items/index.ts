
export interface ArrayAttributesProps {
  name: string
  url: string
}

export interface ArrayEffectsProps {
  effect: string
  language: {
    name: string
    url: string
  },
  // eslint-disable-next-line camelcase
  short_effect: string
}

export interface ItemSchema {
  name: string
  url: string
}

export interface ItemProps {
  id: number
  name: string
  category: string
  sprite: string
  effects: string[]
  attributes: string[]
}
