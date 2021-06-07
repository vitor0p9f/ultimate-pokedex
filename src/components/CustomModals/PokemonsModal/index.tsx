import { Box, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react'

interface AbilityProps {
  name: string
  description: string
}

interface PokemonProps {
  id: number
  name: string
  sprite: string
  types: string[]
  weight: number
  abilities: AbilityProps[]
  baseExperience: number,
  encountersAreas: string[]
}

interface ComponentProps {
  data: PokemonProps
}

const PokemonsModal: React.FC<ComponentProps> = ({ data }) => {
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
            <Image src={data.sprite} alt={data.name} width="80%" height="80%" margin="0"></Image>
            <Stack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default PokemonsModal
