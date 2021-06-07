export type NatureSchema = {
  name: string
  url: string
}

export type NatureStatusChange = {
  // eslint-disable-next-line camelcase
  max_change: number
  // eslint-disable-next-line camelcase
  pokeathlon_stat: {
    name: string,
    url: string
  }
}

export type NatureStatusSchema = {
  name: string
  maxChange: number
}
