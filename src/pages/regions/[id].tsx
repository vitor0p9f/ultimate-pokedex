import RenderPokemons from '@/components/RenderPokemons'
import { PokemonProps } from '@/types/globalTypes'
import { AbilityEffectEntry, AbilityProps, AbilitySchema, AreasNamesSchema, ArrayRegionsSchema, EncountersAreasSchema, LocationProps, PokemonEntries, PokemonTypes, RegionPokedex, RegionProps, StatsProps, StatsSchema } from '@/types/pages/regions/ID'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import LoadingScreen from 'src/components/LoadingScreen'
import Capitalize from '../../globalFunctions/Capitalize'
import AxiosPokeAPI from '../../services/api'

interface ComponentProps {
  region: RegionProps
}

const Region: React.FC<ComponentProps> = ({ region }) => {
  const { isFallback } = useRouter()

  if (isFallback) return <LoadingScreen />

  return (
    <>
      <Head>
        <title>{region.name}</title>
      </Head>

      <RenderPokemons pokemons={region.pokemons} />
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
  // Get Region data
  const { data: regionData } = await AxiosPokeAPI.get(`/region/${context.params?.id}`)

  const region = Object()
  const regionLocations: LocationProps[] = []
  const regionPokemons: PokemonProps[] = []
  const regionID = regionData.id
  const regionName = Capitalize(regionData.name)
  const regionMainGeneration = Capitalize(regionData.main_generation.name)

  // Get region locations
  // const regionLocationsArray: RegionLocation[] = regionData.locations

  // for (const location of regionLocationsArray) {
  //   const { data: locationData } = await AxiosPokeAPI.get(`/location/${location.name}`)

  //   const locationID = locationData.id
  //   const locationName = locationData.name

  //   regionLocations.push({
  //     name: locationName,
  //     id: locationID
  //   })
  // }

  // Get region pok??dex
  const regionPokedex: RegionPokedex = regionData.pokedexes[regionData.pokedexes.length - 1]

  const { data: regionPokedexData } = await axios.get(regionPokedex.url)

  const pokemonsEntriesArray: PokemonEntries[] = regionPokedexData.pokemon_entries

  // Get region Pok??mons Data
  for (const pokemonEntries of pokemonsEntriesArray) {
    const { data: pokemonSpecieData } = await AxiosPokeAPI.get(`/pokemon-species/${pokemonEntries.pokemon_species.name}`)

    const pokemonID = pokemonSpecieData.id

    const { data: pokemonData } = await AxiosPokeAPI.get(`/pokemon/${pokemonID}`)

    const pokemonTypes: string[] = []
    const pokemonStats: StatsProps[] = []
    const pokemonAbilities: AbilityProps[] = []
    const pokemonEncountersAreas: string[] = []
    const pokemonBaseExperience = pokemonData.base_experience
    const pokemonWeight = pokemonData.weight
    const pokemonName = Capitalize(pokemonData.name)
    const pokemonSprite = pokemonData.sprites.front_default

    // Pok??mon types
    const pokemonTypesArray: PokemonTypes[] = pokemonData.types

    for (const type of pokemonTypesArray) {
      pokemonTypes.push(Capitalize(type.type.name))
    }

    // Pok??mon stats
    const pokemonStatusArray: StatsSchema[] = pokemonData.stats

    for (const stats of pokemonStatusArray) {
      pokemonStats.push({
        name: Capitalize(stats.stat.name),
        baseValue: stats.base_stat,
        statsEV: stats.effort
      })
    }

    // Pok??mon Abilities
    const pokemonAbilitiesArray: AbilitySchema[] = pokemonData.abilities

    for (const ability of pokemonAbilitiesArray) {
      const { data: abilityData } = await axios.get(ability.ability.url)

      // Ability effects
      const abilityEffectsArray: AbilityEffectEntry[] = abilityData.effect_entries

      for (const effect of abilityEffectsArray) {
        if (effect.language.name === 'en') {
          pokemonAbilities.push({
            name: Capitalize(ability.ability.name),
            description: effect.short_effect
          })
        }
      }
    }

    // Get pokemon encounters locations
    const { data: pokemonEncountersData } = await AxiosPokeAPI.get(`pokemon/${pokemonID}/encounters`)

    const areasArray: EncountersAreasSchema[] = pokemonEncountersData

    for (const area of areasArray) {
      const { data: areaData } = await axios.get(area.location_area.url)

      const areaNames: AreasNamesSchema[] = areaData.names

      for (const areaName of areaNames) {
        if (areaName.language.name === 'en') {
          if (areaName.name === '') {
            pokemonEncountersAreas.push(Capitalize(area.location_area.name))
          } else {
            pokemonEncountersAreas.push(areaName.name)
          }
        }
      }
    }

    regionPokemons.push({
      id: pokemonID,
      name: pokemonName,
      sprite: pokemonSprite,
      types: pokemonTypes,
      abilities: pokemonAbilities,
      baseExperience: pokemonBaseExperience,
      weight: pokemonWeight,
      encountersAreas: pokemonEncountersAreas,
      stats: pokemonStats
    })
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
