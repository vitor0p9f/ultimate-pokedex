import { Box, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { ComponentProps } from '../../../interfaces/components/CustomModals/ItemsModal'

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
            <Image src={data.sprite} alt={data.name} width="5rem" height="5rem" margin="0"></Image>
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
