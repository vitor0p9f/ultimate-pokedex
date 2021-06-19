import { NatureProps } from '@/types/globalTypes'
import { Box, Heading, Stack, Text, useDisclosure } from '@chakra-ui/react'
import ModalSchema from '../ModalSchema'

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

      <ModalSchema isOpen={isOpen} onClose={onClose} headerText={data.name}>
        <Stack>
          <Text>Name: {data.name}</Text>
          <Text>Likes Flavor: {data.likesFlavor}</Text>
          <Text>Hates Flavor: {data.hatesFlavor}</Text>
        </Stack>
      </ModalSchema>
    </>
  )
}

export default NatureModal
