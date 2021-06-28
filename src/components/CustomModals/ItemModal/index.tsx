import ImageCard from '@/components/ImageCard'
import { ItemProps } from '@/types/globalTypes'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Divider, Flex, List, ListIcon, ListItem, Stack, Text, useDisclosure } from '@chakra-ui/react'
import Image from 'next/image'
import { memo } from 'react'
import ModalSchema from '../ModalSchema'

interface ComponentProps {
  data: ItemProps
}

const ItemModalComponent: React.FC<ComponentProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <ImageCard data={data} onOpen={onOpen} animation={true} cursorPointer={true} />

      <ModalSchema isOpen={isOpen} onClose={onClose} headerText={data.name}>
        <Flex direction="column" alignItems="center" width="100%">
          <Image src={data.sprite} alt={data.name} width="100%" height="100%" />

          <Stack width="80%" marginTop="5%">
            <Flex flexDir="row" alignItems="center" justifyContent="space-between" width="100%">
              <Text>Name:</Text>

              <Text>{data.name}</Text>
            </Flex>

            <Divider variant="dashed" />

            <Flex flexDir="row" alignItems="center" justifyContent="space-between" width="100%">
              <Text>Category:</Text>

              <Text>{data.category}</Text>
            </Flex>

            <Divider variant="dashed" />

            <Flex direction="column" alignItems="flex-start" justifyContent="space-between" width="100%">
              <Text>Effects:</Text>

              <List spacing={3} marginTop="10px">
                {data.effects.map(effect => (
                  <ListItem key={effect}>
                    <ListIcon as={ChevronRightIcon} color="green.500" />
                    {effect}
                  </ListItem>
                ))}
              </List>
            </Flex>

            <Divider variant="dashed" />

            <Flex direction="column" alignItems="flex-start" justifyContent="space-between" width="100%">
              <Text>Attributes:</Text>

              <List spacing={3} marginTop="10px">
                {data.attributes.map(attribute => (
                  <ListItem key={attribute}>
                    <ListIcon as={ChevronRightIcon} color="green.500" />
                    {attribute}
                  </ListItem>
                ))}
              </List>
            </Flex>
          </Stack>
        </Flex>
      </ModalSchema>
    </>
  )
}

const ItemModal = memo(ItemModalComponent)

export default ItemModal
