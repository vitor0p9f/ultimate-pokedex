type PokemonView = {
  name: string
  id: number
  sprite: string
  types: string[]
}

type MetaProps = {
  ailment: string
  ailmentChance: number
  critRate: number
  flinchChance: number
}

export type MoveProps = {
  name: string
  id: number
  accuracy: number
  effects: string[]
  type: string
  target: string
  priority: number
  pp: number
  power: number
  meta: MetaProps
  damageClass: string
  learnedBy: PokemonView[]
}
