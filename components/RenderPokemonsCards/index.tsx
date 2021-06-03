import { Box, Center, SimpleGrid, useRadioGroup } from '@chakra-ui/react'
import Image from 'next/image'
import { useState } from 'react'
import RadioCard from '../RadioCard'
import RenderItemCards from '../RenderItemCards'
import types from './typesObject'

interface PokemonProps {
  id: number
  name: string
  sprite: string
  types: string[]
}

interface ComponentProps {
  pokemons: PokemonProps[]
  path: string
}

const RenderPokemonsCards: React.FC<ComponentProps> = ({ pokemons, path }) => {
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
      <Center>
        <SimpleGrid columns={9} {...radioGroup} spacing="20px" marginBottom="30px" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          filterPokemons(event.target.value)
        }}>
          {types.map((type) => {
            const radio = getRadioProps(type)
            return (
              <RadioCard key={type.name} radioProps={radio} bgColor={type.backgroundColor} value={type.name} >
                <Image src={`/img/types/${type.name}.svg`} alt={type.name} width="50%" height="50%" />
              </RadioCard>
            )
          })}
        </SimpleGrid>
      </Center>
      <Box paddingRight="5%" paddingLeft="5%">
        <RenderItemCards items={currentPokemons} path={path} />
      </Box>
    </>
  )
}

export default RenderPokemonsCards
