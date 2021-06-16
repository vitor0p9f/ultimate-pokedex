import ImageCard from '@/components/ImageCard'
import { PokemonProps } from '@/types/globalTypes'
import { Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, useDisclosure } from '@chakra-ui/react'
type ComponentProps = {
  data: PokemonProps
}

const PokemonModal: React.FC<ComponentProps> = ({ data }) => {
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
            <Image src={data.sprite} alt={data.name} width="80%" height="80%" margin="0"></Image>
            <Stack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default PokemonModal
