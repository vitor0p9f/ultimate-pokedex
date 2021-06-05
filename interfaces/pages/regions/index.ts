export interface StatsProps {
  name: string
  baseValue: number
  statsEV: number
}

export interface AbilityProps {
  name: string
  description: string
}

export interface StatsSchema {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export interface AbilitySchema {
  ability: {
    name: string,
    url: string
  }
}

export interface ArrayRegionsSchema {
  name: string
  url: string
}

export interface RegionPokedex {
  name: string
  url: string
}

export interface LocationProps {
  name: string
  id: number
}

export interface RegionLocation {
  name: string
  url: string
}

export interface PokemonEntries {
  entry_number: number
  pokemon_species: {
    name: string
    url: string
  }
}

export interface AbilityEffectEntry {
  language: {
    name: string,
  }
  short_effect: string
}

export interface PokemonTypes {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface PokemonProps {
  id: number
  name: string
  sprite: string
  types: string[]
  weight: number
  abilities: AbilityProps[]
  baseExperience: number,
  encountersAreas: string[]
}

export interface RegionProps {
  id: number,
  name: string,
  mainGeneration: string,
  locations: LocationProps[],
  pokemons: PokemonProps[]
}

export interface EncountersAreasSchema{
  location_area: {
    name: string
    url: string
  },
}

export interface AreasNamesSchema{
  language: {
    name: string

  },
  name: string
}