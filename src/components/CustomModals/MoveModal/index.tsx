import ImageCard from '@/components/ImageCard'
import { Box, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, SimpleGrid, Stack, Text, useDisclosure } from '@chakra-ui/react'

type PokemonView = {
  name: string
  id: number
  sprite: string
  types: string[]
}

type MetaProps = {
  ailment: string
  ailmentChance: number
  critRate: number
  flinchChance: number
}

type MoveProps = {
  name: string
  id: number
  accuracy: number
  effects: string[]
  type: string
  target: string
  priority: number
  pp: number
  power: number
  meta: MetaProps
  damageClass: string
  learnedBy: PokemonView[]
}

type ComponentProps = {
  data: MoveProps
}

const MoveModal: React.FC<ComponentProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box key={data.id} cursor="pointer" fontSize={['sm', 'md', 'lg']} display="flex" flexDirection="column" alignItems="center" justifyContent="center" onClick={onOpen} _hover={{
        backgroundColor: '#666666'
      }}>
        <Heading size="md">{data.name}</Heading>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside">
        <ModalOverlay />

        <ModalContent fontSize={['sm', 'md', 'lg']} marginLeft="5%" marginRight="5%">
          <ModalHeader textAlign="center">{data.name}</ModalHeader>

          <ModalCloseButton />

          <ModalBody display="flex" flexDir="column">
            <Stack marginBottom="20px">
              <Text>Name: {data.name}</Text>
              <Text>Accuracy: {data.accuracy}</Text>
              <Text>Damage Class: {data.damageClass}</Text>
            </Stack>

            <SimpleGrid columns={2} spacing="20px" paddingRight="5%" paddingLeft="5%" width="100%">
              {data.learnedBy.map(pokemon => (
                <ImageCard key="" data={pokemon} animation={false} />
              ))}
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MoveModal
