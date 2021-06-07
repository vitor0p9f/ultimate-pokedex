import { NatureProps } from '@/types/globalTypes'
import { Box, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react'

interface ComponentProps {
  data: NatureProps
}

const NaturesModal: React.FC<ComponentProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box key={data.id} cursor="pointer"
        display="flex" flexDirection="column" alignItems="center" justifyContent="center" onClick={onOpen} _hover={{
          backgroundColor: '#666666'
        }}>

        <Heading size="md">{data.name}</Heading>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">{data.name}</ModalHeader>
          <ModalCloseButton />

          <ModalBody display="flex" flexDir="column">
            <Stack>
              <Text>Name: {data.name}</Text>
              <Text>Name: {data.likesFlavor}</Text>
              <Text>Name: {data.hatesFlavor}</Text>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NaturesModal
