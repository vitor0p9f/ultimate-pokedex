import ImageCard from '@/components/ImageCard'
import { PokemonProps } from '@/types/globalTypes'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Divider, Flex, Image, List, ListIcon, ListItem, SimpleGrid, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { memo } from 'react'
import ModalSchema from '../ModalSchema'

type ComponentProps = {
  data: PokemonProps
}

const PokemonModalComponent: React.FC<ComponentProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <ImageCard data={data} onOpen={onOpen} animation={true} cursorPointer={true} />

      <ModalSchema isOpen={isOpen} onClose={onClose} headerText={data.name}>
        <SimpleGrid columns={2} spacing="10%" width="100%" alignItems="center" display="flex">
          <Image src={data.sprite} alt={data.name} width="100%" height="100%" />

          <Stack display="flex" justifyContent="center" alignItems="center" width={['60%', '100%']} alignSelf="center">
            {data.stats.map((stat, index) => (
              <>
                <Flex flexDir="row" alignItems="center" justifyContent="space-between" width="100%" key={stat.name}>
                  <Text>{stat.name}:</Text>
                  <Text>{stat.baseValue}</Text>
                </Flex>
                {index === (data.stats.length - 1) ? null : <Divider variant="dashed" />}
              </>
            ))}

            <Flex flexDir="row" alignItems="center" justifyContent="space-between" width="100%">
              <Text>Base XP:</Text>
              <Text>{data.baseExperience}</Text>
            </Flex>

            <Divider variant="dashed" />

            <Flex flexDir="row" alignItems="center" justifyContent="space-between" width="100%">
              <Text>Weight:</Text>
              <Text>{data.weight}</Text>
            </Flex>
          </Stack>
        </SimpleGrid>

        <Divider variant="dashed" />

        <Flex direction="column" alignItems="flex-start" justifyContent="space-between" width="100%" marginTop="10px">
          <Text>Abilities:</Text>

          <List spacing={3} marginTop="10px">
            {data.abilities.map((ability, index) => (
              <>
                <ListItem key={ability.name} display="flex">
                  <ListIcon as={ChevronRightIcon} color="green.500" />

                  <Stack>
                    <Text>{ability.name}</Text>
                    <Text>{ability.description}</Text>
                  </Stack>
                </ListItem>
                {index === (data.abilities.length - 1) ? null : <Divider variant="dashed" />}
              </>
            ))}
          </List>
        </Flex>

        {data.encountersAreas.length > 0 && <>
          <Divider variant="dashed" />

          <Flex direction="column" alignItems="flex-start" justifyContent="space-between" width="100%" marginTop="10px">
            <Text>Encounters area:</Text>

            <List spacing={3} marginTop="10px">
              {data.encountersAreas.map(area => (
                <ListItem key={area}>
                  <ListIcon as={ChevronRightIcon} color="green.500" />
                  {area}
                </ListItem>
              ))}
            </List>
          </Flex>
        </>}
      </ModalSchema>
    </>
  )
}

const PokemonModal = memo(PokemonModalComponent)

export default PokemonModal
