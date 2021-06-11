import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Capitalize from '../../globalFunctions/Capitalize'

interface ItemsProps {
  name: string
  id: number
}

interface ComponentProps {
  items: ItemsProps[]
  path: string
}

const RenderTextCards: React.FC<ComponentProps> = ({ items, path }) => {
  const router = useRouter()

  return (
    <SimpleGrid columns={[2, 4]} spacing="20px">
      {items.map(item => (
        <Box key={item.id} cursor="pointer"
          display="flex" flexDirection="column" alignItems="center" justifyContent="center" onClick={() => { router.push(`/${path}/${item.id}`) }} _hover={{
            backgroundColor: '#666666'
          }}>

          <Text>{Capitalize(item.name)}</Text>
        </Box>
      ))}
    </SimpleGrid>
  )
}

export default RenderTextCards
