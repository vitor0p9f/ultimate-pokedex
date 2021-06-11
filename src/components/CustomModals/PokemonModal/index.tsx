import getTypesColor from '@/globalFunctions/GetColorByType'
import { Badge, Box, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react'

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

const PokemonModal: React.FC<ComponentProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box key={data.id} cursor="pointer" fontSize={['sm', 'md', 'lg']}
        display="flex" flexDirection="column" alignItems="center" justifyContent="center" onClick={onOpen} _hover={{
          backgroundColor: '#666666'
        }}>

        <Image src={data.sprite} alt={data.name} width="100%" height="100%" />

        <Flex justify={data.types.length > 1 ? 'space-between' : 'center'} width="80%">
          {data.types.map(type => (
            <Badge key="" width="40%" textAlign="center" variant="subtle" bgColor={getTypesColor(type)}>
              {type}
            </Badge>
          ))}
        </Flex>

        <Text>{data.name}</Text>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="outside">
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
