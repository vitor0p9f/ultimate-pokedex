import { NatureProps } from '@/types/globalTypes'
import { Box, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react'

type ComponentProps = {
  data: NatureProps
}

const NatureModal: React.FC<ComponentProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box key={data.id} cursor="pointer" fontSize={['sm', 'md', 'lg']} display="flex" flexDirection="column" alignItems="center" justifyContent="center" onClick={onOpen} _hover={{
        backgroundColor: '#666666'
      }}>
        <Heading size="md">{data.name}</Heading>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="outside">
        <ModalOverlay />

        <ModalContent fontSize={['sm', 'md', 'lg']} marginLeft="5%" marginRight="5%">
          <ModalHeader textAlign="center">{data.name}</ModalHeader>

          <ModalCloseButton />

          <ModalBody display="flex" flexDir="column">
            <Stack>
              <Text>Name: {data.name}</Text>
              <Text>Likes Flavor: {data.likesFlavor}</Text>
              <Text>Hates Flavor: {data.hatesFlavor}</Text>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NatureModal
