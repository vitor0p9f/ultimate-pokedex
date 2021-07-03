import PokemonModal from '@/components/CustomModals/PokemonModal'
import RadioCard from '@/components/RadioCard'
import { PokemonProps } from '@/types/globalTypes'
import { Box, Button, Center, Flex, Heading, SimpleGrid, Text, useRadioGroup } from '@chakra-ui/react'
import Image from 'next/image'
import { useState } from 'react'
import getTypesColor from 'src/globalFunctions/GetColorByType'

const types = ['Normal', 'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel', 'Fire', 'Grass', 'Water', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark', 'Fairy']

interface ComponentProps {
  pokemons: PokemonProps[]
}

const RenderPokemons: React.FC<ComponentProps> = ({ pokemons }) => {
  const [currentPokemons, setCurrentPokemons] = useState(pokemons)
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'Type'
  })

  const radioGroup = getRootProps()

  function filterPokemons(selectedType: string): void {
    const requirement = (pokemon: PokemonProps): (PokemonProps | undefined) => {
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
      <Flex paddingLeft="5%" paddingRight="5%" alignItems="center" flexDir="column" width="100%">
        <Box marginBottom="50px">
          <Heading size="lg" fontFamily="Josefin Sans">
            Pokemons
          </Heading>
        </Box>

        <Text>Filter by types</Text>

        <Box {...radioGroup} width="100%" marginTop="30px" marginBottom="30px" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          filterPokemons(event.target.value)
        }}>
          <SimpleGrid columns={[3, 6, 9]} spacing="20px" width="100%">
            {types.map((type) => {
              const radio = getRadioProps({
                name: type
              })
              return (
                <Center key={type}>
                  <RadioCard radioProps={radio} bgColor={getTypesColor(type)} value={type} tooltipText={type}>
                    <Image src={`/img/types/${type}.svg`} alt={type} width="45%" height="45%" />
                  </RadioCard>
                </Center>
              )
            })}
          </SimpleGrid>
        </Box>

        <Button onClick={() => setCurrentPokemons(pokemons)} marginBottom="30px">Clear Filter</Button>

        <SimpleGrid columns={[2, 4, 6]} spacing="30px" width="100%" marginBottom="30px">
          {currentPokemons.map(pokemon => (
            <PokemonModal key={pokemon.id} data={pokemon} />
          ))}
        </SimpleGrid>
      </Flex>
    </>
  )
}

export default RenderPokemons
