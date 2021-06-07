import { ItemProps } from '@/types/globalTypes'
import { Box, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react'

interface ComponentProps {
  data: ItemProps
}

const ItemsModal: React.FC<ComponentProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box key={data.id} cursor="pointer"
        display="flex" flexDirection="column" alignItems="center" justifyContent="center" onClick={onOpen} _hover={{
          backgroundColor: '#666666'
        }}>

        <Image src={data.sprite} alt={data.name} width="100%" height="100%" />
        <Text>{data.name}</Text>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
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

export default ItemsModal
