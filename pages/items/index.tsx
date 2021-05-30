import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import axios from 'axios'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import Navbar from '../../components/Navbar'
import AxiosPokeAPI from '../../services/api'

interface ItemSchema {
  name: string
  url: string
}

interface ItemProps {
  name: string
  id: string
  sprite: string
}

interface ComponentProps {
  items: Array<ItemProps>
}

const Items: React.FC<ComponentProps> = ({ items }) => {
  const router = useRouter()
  return (
    <>
      <Navbar />
      <Flex justifyContent="center" alignItems="center">
        <SimpleGrid columns={4} spacing="50px">
          {items.map(item => (
            <Box key={item.id} cursor="pointer"
              display="flex" flexDirection="column" alignItems="center" justifyContent="center" onClick={() => { router.push(`/items/${item.id}`) }} _hover={{
                color: '#666666'
              }}>

              <Image src={item.sprite} alt={item.name} width="5rem" height="5rem" margin="0"></Image>
              <Text>{item.name}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Flex>
    </>
  )
}

export default Items

export const getStaticProps: GetStaticProps = async () => {
  const items: Array<ItemProps> = []
  const { data: itemsData } = await AxiosPokeAPI.get('/item/?limit=1000')

  const itemsArray: Array<ItemSchema> = itemsData.results

  for (const item of itemsArray) {
    const { data: itemData } = await axios.get(item.url)

    const itemID = itemData.id
    const itemSprite = itemData.sprites.default
    const itemName = itemData.name

    items.push({
      name: itemName,
      id: itemID,
      sprite: itemSprite
    })
  }

  return {
    props: {
      items
    }
  }
}
