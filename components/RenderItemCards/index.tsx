import { Box, SimpleGrid, Text } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import Capitalize from '../../globalFunctions/Capitalize'

interface ItemProps {
  id: number
  name: string
  sprite: string
}

interface ComponentProps {
  items: ItemProps[]
  path: string
}

const RenderItemCards: React.FC<ComponentProps> = ({ items, path }) => {
  const router = useRouter()

  return (
    <SimpleGrid columns={4} spacing="50px">
      {items.map(item => (
        <Box key={item.id} cursor="pointer"
          display="flex" flexDirection="column" alignItems="center" justifyContent="center" onClick={() => { router.push(`/${path}/${item.id}`) }} _hover={{
            backgroundColor: '#666666'
          }}>

          <Image src={item.sprite} alt={item.name} width="100%" height="100%" />
          <Text>{Capitalize(item.name)}</Text>
        </Box>
      ))}
    </SimpleGrid>
  )
}

export default RenderItemCards
