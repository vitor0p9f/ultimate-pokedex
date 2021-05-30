export interface RegionProps {
  name: string,
  url: string
}

export interface RegionPokedexProps {
  name: string,
  url: string
}

export interface PokedexPokemonsProps{
  // eslint-disable-next-line camelcase
  entry_number: number,
  // eslint-disable-next-line camelcase
  pokemon_species: {
    name: string,
    url: string
  }
}

export interface PokemonProps{
  id: string,
  name: string,
  imageURI: string
}

export interface PokemonsProps{
  [x: string] : PokemonProps[]
}
