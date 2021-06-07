import { Button, Center, Flex, SimpleGrid, useRadioGroup } from '@chakra-ui/react'
import Image from 'next/image'
import { useState } from 'react'
import getTypesColor from 'src/globalFunctions/GetColorByType'
import PokemonsModal from '../CustomModals/PokemonsModal'
import RadioCard from '../RadioCard'

const types = ['Normal', 'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel', 'Fire', 'Grass', 'Water', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark', 'Fairy']

interface AbilityProps {
  name: string
  description: string
}

interface PokemonProps {
  id: number
  name: string
  sprite: string
  types: string[]
  weight: number
  abilities: AbilityProps[]
  baseExperience: number,
  encountersAreas: string[]
}

interface ComponentProps {
  pokemons: PokemonProps[]
}

const RenderPokemonsCards: React.FC<ComponentProps> = ({ pokemons }) => {
  const [currentPokemons, setCurrentPokemons] = useState(pokemons)
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'Type'
  })

  const radioGroup = getRootProps()

  function filterPokemons(selectedType: string): void {
    const requirement = (pokemon: PokemonProps): any => {
      if (selectedType) {
        for (const type of pokemon.types) {
          if (selectedType === type) {
            return pokemon
          }
        }
      } else {
        return pokemon
      }
    }

    const filteredPokemons = pokemons.filter(requirement)

    setCurrentPokemons(filteredPokemons)
  }

  return (
    <>
      <Flex paddingLeft="5%" paddingRight="5%" alignContent="center" flexDir="column" width="100%">
        <SimpleGrid columns={9} {...radioGroup} spacing="20px" marginBottom="30px" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          filterPokemons(event.target.value)
        }} width="100%">
          {types.map((type) => {
            const radio = getRadioProps({
              name: type
            })
            return (
              <RadioCard key={type} radioProps={radio} bgColor={getTypesColor(type)} value={type} >
                <Image src={`/img/types/${type}.svg`} alt={type} width="45%" height="45%" />
              </RadioCard>
            )
          })}
        </SimpleGrid>

        <Center marginBottom="30px">
          <Button onClick={() => setCurrentPokemons(pokemons)}>Clear Filter</Button>
        </Center>

        <SimpleGrid columns={6} spacing="20px" width="100%">
          {currentPokemons.map(pokemon => (
            <PokemonsModal key={pokemon.id} data={pokemon} />
          ))}
        </SimpleGrid>
      </Flex>
    </>
  )
}

export default RenderPokemonsCards
