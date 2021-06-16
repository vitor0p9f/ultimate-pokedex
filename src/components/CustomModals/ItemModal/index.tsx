import ImageCard from '@/components/ImageCard'
import { ItemProps } from '@/types/globalTypes'
import { Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react'

interface ComponentProps {
  data: ItemProps
}

const ItemModal: React.FC<ComponentProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <ImageCard data={data} onOpen={onOpen} animation={true}/>

      <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside">
        <ModalOverlay />

        <ModalContent fontSize={['sm', 'md', 'lg']} marginLeft="5%" marginRight="5%">
          <ModalHeader textAlign="center">{data.name}</ModalHeader>

          <ModalCloseButton />

          <ModalBody display="flex" flexDir="column">
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ItemModal
