import MoveModal from '@/components/CustomModals/MoveModal'
import Navbar from '@/components/Navbar'
import Capitalize from '@/globalFunctions/Capitalize'
import AxiosPokeAPI from '@/services/api'
import { SimpleGrid } from '@chakra-ui/react'
import axios from 'axios'
import { GetStaticProps } from 'next'
import Head from 'next/head'

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

type MoveProps = {
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

type ComponentProps = {
  moves: MoveProps[]
}

const Moves: React.FC<ComponentProps> = ({ moves }) => {
  return (
    <>
      <Head>
        <title>Moves</title>
      </Head>

      <Navbar />

      <SimpleGrid columns={[2, 4, 6]} spacing="20px" paddingRight="5%" paddingLeft="5%" width="100%">
        {moves.map(move => (
          <MoveModal key="" data={move} />
        ))}
      </SimpleGrid>
    </>
  )
}

export default Moves

export const getStaticProps: GetStaticProps = async () => {
  const moves: MoveProps[] = []

  const { data: movesData } = await AxiosPokeAPI.get('move/?limit=1') // limit 900

  const allMoves = movesData.results

  for (const move of allMoves) {
    const { data: moveData } = await axios.get(move.url)

    const moveEffects = []
    const movePokemons: PokemonView[] = []
    const moveMeta = Object()
    const moveName = Capitalize(moveData.name)
    const moveID = moveData.id
    const moveAccuracy = moveData.accuracy
    const movePower = moveData.power
    const movePP = moveData.pp
    const movePriority = moveData.priority
    const moveDamageClass = Capitalize(moveData.damage_class.name)
    const moveTarget = Capitalize(moveData.target.name)
    const moveType = Capitalize(moveData.type.name)

    const moveEffectsData = moveData.effect_entries

    for (const effect of moveEffectsData) {
      if (effect.language.name === 'en') {
        moveEffects.push(effect.effect)
      }
    }

    const moveAllPokemons = moveData.learned_by_pokemon

    for (const pokemon of moveAllPokemons) {
      const { data: pokemonData } = await axios.get(pokemon.url)

      const pokemonTypes = []
      const pokemonName = Capitalize(pokemonData.name)
      const pokemonSprite = pokemonData.sprites.front_default
      const pokemonID = pokemonData.id

      const pokemonTypesArray = pokemonData.types

      for (const type of pokemonTypesArray) {
        pokemonTypes.push(Capitalize(type.type.name))
      }

      movePokemons.push({
        id: pokemonID,
        name: pokemonName,
        sprite: pokemonSprite,
        types: pokemonTypes
      })
    }

    moves.push({
      name: moveName,
      id: moveID,
      accuracy: moveAccuracy,
      effects: moveEffects,
      type: moveType,
      target: moveTarget,
      priority: movePriority,
      pp: movePP,
      power: movePower,
      meta: moveMeta,
      damageClass: moveDamageClass,
      learnedBy: movePokemons
    })
  }

  return {
    props: {
      moves
    },
    revalidate: 86400
  }
}
