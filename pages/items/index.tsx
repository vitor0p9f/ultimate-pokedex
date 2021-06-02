import { Flex } from '@chakra-ui/react'
import axios from 'axios'
import { GetStaticProps } from 'next'
import Navbar from '../../components/Navbar'
import RenderItemCards from '../../components/RenderItemCards'
import AxiosPokeAPI from '../../services/api'

interface ItemSchema {
  name: string
  url: string
}

interface ItemProps {
  name: string
  id: number
  sprite: string
}

interface ComponentProps {
  items: ItemProps[]
}

const Items: React.FC<ComponentProps> = ({ items }) => {
  return (
    <>
      <Navbar />
      <Flex justifyContent="center" alignItems="center">
        <RenderItemCards items={items} path="items" />
      </Flex>
    </>
  )
}

export default Items

export const getStaticProps: GetStaticProps = async () => {
  const items: Array<ItemProps> = []
  const { data: itemsData } = await AxiosPokeAPI.get('/item/?limit=1000')

  const itemsArray: ItemSchema[] = itemsData.results

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
    },
    revalidate: 86400
  }
}
