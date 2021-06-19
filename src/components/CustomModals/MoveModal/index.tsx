import ImageCard from '@/components/ImageCard'
import { MoveProps } from '@/types/components/CustomModals/MoveModal'
import { Box, Heading, SimpleGrid, Stack, Text, useDisclosure } from '@chakra-ui/react'
import ModalSchema from '../ModalSchema'

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

      <ModalSchema headerText={data.name} isOpen={isOpen} onClose={onClose}>
        <Stack marginBottom="20px">
          <Text>Name: {data.name}</Text>
          <Text>Accuracy: {data.accuracy}</Text>
          <Text>Damage Class: {data.damageClass}</Text>
        </Stack>

        <SimpleGrid columns={2} spacing="20px" paddingRight="5%" paddingLeft="5%" width="100%">
          {data.learnedBy.map(pokemon => (
            <ImageCard key="" data={pokemon} animation={false} cursorPointer={false} />
          ))}
        </SimpleGrid>
      </ModalSchema>
    </>
  )
}

export default MoveModal
