import { BerryFlavorProps } from './components/CustomModals/BerryModal'
import { AbilityProps } from './components/CustomModals/PokemonModal'
import { NatureStatusSchema } from './pages/natures'

export type BerryProps = {
  id: number
  name: string
  sprite: string
  firmness: string
  maxHarvest: number
  growthTime: number
  flavors: BerryFlavorProps[]
}

export type ItemProps = {
  id: number
  name: string
  category: string
  sprite: string
  effects: string[]
  attributes: string[]
}

export type NatureProps = {
  name: string,
  id: number,
  increasedStat: string,
  decreasedStat: string,
  likesFlavor: string,
  hatesFlavor: string
  statusChange: NatureStatusSchema[]
}

export type PokemonProps = {
  id: number
  name: string
  sprite: string
  types: string[]
  weight: number
  abilities: AbilityProps[]
  baseExperience: number,
  encountersAreas: string[]
}
