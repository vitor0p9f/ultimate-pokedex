import { PokemonProps } from '@/types/globalTypes'

export type StatsProps = {
  name: string
  baseValue: number
  statsEV: number
}

export type AbilityProps = {
  name: string
  description: string
}

export type StatsSchema = {
  // eslint-disable-next-line camelcase
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export type AbilitySchema = {
  ability: {
    name: string,
    url: string
  }
}

export type ArrayRegionsSchema = {
  name: string
  url: string
}

export type RegionPokedex = {
  name: string
  url: string
}

export type LocationProps = {
  name: string
  id: number
}

export type RegionLocation = {
  name: string
  url: string
}

export type PokemonEntries = {
  // eslint-disable-next-line camelcase
  entry_number: number
  // eslint-disable-next-line camelcase
  pokemon_species: {
    name: string
    url: string
  }
}

export type AbilityEffectEntry = {
  language: {
    name: string,
  }
  // eslint-disable-next-line camelcase
  short_effect: string
}

export type PokemonTypes = {
  slot: number
  type: {
    name: string
    url: string
  }
}

export type RegionProps = {
  id: number,
  name: string,
  mainGeneration: string,
  locations: LocationProps[],
  pokemons: PokemonProps[]
}

export type EncountersAreasSchema = {
  // eslint-disable-next-line camelcase
  location_area: {
    name: string
    url: string
  },
}

export type AreasNamesSchema = {
  language: {
    name: string

  },
  name: string
}
