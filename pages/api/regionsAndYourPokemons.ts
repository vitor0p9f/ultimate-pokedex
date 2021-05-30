import Axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { PokedexPokemonsProps, PokemonProps, PokemonsProps, RegionPokedexProps, RegionProps } from '../../interfaces/api/regionsAndYourPokemons'
import AxiosPokeAPI from '../../services/api'

export default async(req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'GET') {
    const regionNames: Array<string> = []
    const pokemons: Array<PokemonsProps> = []

    const { data: regionsData } = await AxiosPokeAPI.get('/region')

    const regions: Array<RegionProps> = regionsData.results

    // Percorre todas as regiões
    for (const region of regions) {
      const pokemonsRegion: Array<PokemonProps> = []
      regionNames.push(region.name)

      const { data: regionData } = await Axios.get(region.url)

      const pokedex: RegionPokedexProps = regionData.pokedexes[regionData.pokedexes.length - 1]

      const { data: pokedexData } = await Axios.get(pokedex.url)

      const pokemonEntries: Array<PokedexPokemonsProps> = pokedexData.pokemon_entries

      // Percorre os pokemons de cada região pra pegar as informações deles em dois endpoints da API
      for (const pokemon of pokemonEntries) {
        const { data: pokemonSpecieData } = await AxiosPokeAPI.get(`/pokemon-species/${pokemon.pokemon_species.name}`)

        const pokemonID = pokemonSpecieData.id

        const { data: pokemonData } = await AxiosPokeAPI.get(`/pokemon/${pokemonID}`)

        const name = pokemonData.name

        const imageURI: string = pokemonData.sprites.front_default

        const pokemonSchema: PokemonProps = {
          name,
          imageURI,
          id: pokemonID
        }

        pokemonsRegion.push(pokemonSchema)
      }

      pokemons.push({
        [region.name]: pokemonsRegion
      })
    }

    return res.status(200).json({ regionNames, pokemons })
  }
}
