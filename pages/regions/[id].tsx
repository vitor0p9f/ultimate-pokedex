import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import LoadingScreen from '../../components/LoadingScreen'
import Navbar from '../../components/Navbar'
import RenderPokemonsCards from '../../components/RenderPokemonsCards'
import Capitalize from '../../globalFunctions/Capitalize'
import AxiosPokeAPI from '../../services/api'

interface ArrayRegionsSchema {
  name: string
  url: string
}

interface RegionPokedex {
  name: string
  url: string
}

interface LocationProps {
  name: string
  id: number
}

// interface RegionLocation {
//   name: string
//   url: string
// }

interface PokemonEntries {
  // eslint-disable-next-line camelcase
  entry_number: number
  // eslint-disable-next-line camelcase
  pokemon_species: {
    name: string
    url: string
  }
}

interface PokemonTypes {
  slot: number
  type: {
    name: string
    url: string
  }
}

interface PokemonProps {
  id: number
  name: string
  sprite: string
  types: string[]
}

interface RegionProps {
  id: number,
  name: string,
  mainGeneration: string,
  locations: LocationProps[],
  pokemons: PokemonProps[]
}

interface ComponentProps {
  region: RegionProps
}

const Region: React.FC<ComponentProps> = ({ region }) => {
  const { isFallback } = useRouter()

  if (isFallback) return <LoadingScreen />

  return (
    <>
      <Navbar />
      {/* <UnorderedList>
        {region.locations.map(location => (
          <ListItem key={location.id}>{location.name}</ListItem>
        ))}
      </UnorderedList> */}
      <RenderPokemonsCards pokemons={region.pokemons} path="pokemon" />
    </>
  )
}

export default Region

export const getStaticPaths: GetStaticPaths = async () => {
  const regionsID: string[] = []

  const { data: regionsData } = await AxiosPokeAPI.get('/region')

  const regionsArray: ArrayRegionsSchema[] = regionsData.results

  for (const region of regionsArray) {
    const { data: regionData } = await axios.get(region.url)

    const itemID = String(regionData.id)

    regionsID.push(itemID)
  }

  const paths = regionsID.map(regionID => ({
    params: { id: regionID }
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const region = Object()
  const regionLocations: LocationProps[] = []
  const regionPokemons: PokemonProps[] = []

  const { data: regionData } = await AxiosPokeAPI.get(`/region/${context.params?.id}`)

  const regionID = regionData.id
  const regionName = Capitalize(regionData.name)
  const regionMainGeneration = Capitalize(regionData.main_generation.name)

  // const regionLocationsArray: RegionLocation[] = regionData.locations

  // for (const location of regionLocationsArray) {
  //   const { data: locationData } = await AxiosPokeAPI.get(`/location/${location.name}`)

  //   const locationID = locationData.id
  //   const locationName = Capitalize(locationData.name)

  //   regionLocations.push({
  //     name: locationName,
  //     id: locationID
  //   })
  // }

  const regionPokedex: RegionPokedex = regionData.pokedexes[regionData.pokedexes.length - 1]

  const { data: regionPokedexData } = await axios.get(regionPokedex.url)

  const pokemonsEntriesArray: PokemonEntries[] = regionPokedexData.pokemon_entries

  for (const pokemonEntries of pokemonsEntriesArray) {
    const { data: pokemonSpecieData } = await AxiosPokeAPI.get(`/pokemon-species/${pokemonEntries.pokemon_species.name}`)

    const pokemonID = pokemonSpecieData.id

    const { data: pokemonData } = await AxiosPokeAPI.get(`/pokemon/${pokemonID}`)

    const pokemonName = Capitalize(pokemonData.name)
    const pokemonSprite = pokemonData.sprites.front_default
    const pokemonTypesArray: PokemonTypes[] = pokemonData.types
    const pokemonTypes = []

    for (const type of pokemonTypesArray) {
      pokemonTypes.push(Capitalize(type.type.name))
    }

    const pokemonSchema = {
      id: pokemonID,
      name: pokemonName,
      sprite: pokemonSprite,
      types: pokemonTypes
    }

    regionPokemons.push(pokemonSchema)
  }

  const regionSchema = {
    id: regionID,
    name: regionName,
    mainGeneration: regionMainGeneration,
    locations: regionLocations,
    pokemons: regionPokemons
  }

  Object.assign(region, regionSchema)

  return {
    props: {
      region
    },
    revalidate: 86400
  }
}
