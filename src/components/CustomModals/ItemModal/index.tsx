import ImageCard from '@/components/ImageCard'
import { ItemProps } from '@/types/globalTypes'
import { Image, Stack, Text, useDisclosure } from '@chakra-ui/react'
import ModalSchema from '../ModalSchema'

interface ComponentProps {
  data: ItemProps
}

const ItemModal: React.FC<ComponentProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <ImageCard data={data} onOpen={onOpen} animation={true} />

      <ModalSchema isOpen={isOpen} onClose={onClose} headerText={data.name}>
        <Image src={data.sprite} alt={data.name} width="80%" height="80%" margin="0" alignSelf="center" />

        <Stack>
          <Text>Name: {data.name}</Text>

          <Text>Category: {data.category}</Text>

          <Text>Effects:</Text>

          <Stack direction="column" spacing={4}>
            {data.effects.map(effect => (
              <Text key="">{effect}</Text>
            ))}
          </Stack>
        </Stack>
      </ModalSchema>
    </>
  )
}

export default ItemModal
