import { SimpleGrid } from '@chakra-ui/react'
import axios from 'axios'
import { GetStaticProps } from 'next'
import ItemsModal from '@/components/CustomModals/ItemsModal'
import Navbar from '@/components/Navbar'
import Capitalize from '../../globalFunctions/Capitalize'
import { ArrayAttributesProps, ArrayEffectsProps, ItemProps, ItemSchema } from '@/interfaces/pages/items'
import AxiosPokeAPI from '../../services/api'

export interface ComponentProps {
  items: ItemProps[]
}

const Items: React.FC<ComponentProps> = ({ items }) => {
  return (
    <>
      <Navbar />
      <SimpleGrid columns={6} spacing="50px" marginRight="5%" marginLeft="5%">
        {items.map(item => (
          <ItemsModal data={item} key={item.id} />
        ))}
      </SimpleGrid>
    </>
  )
}

export default Items

export const getStaticProps: GetStaticProps = async () => {
  const items: ItemProps[] = []
  const { data: itemsData } = await AxiosPokeAPI.get('/item/?limit=1000')

  const itemsArray: ItemSchema[] = itemsData.results

  for (const item of itemsArray) {
    const { data: itemData } = await axios(item.url)

    const arrayOfItemsAttributes: ArrayAttributesProps[] = itemData.attributes
    const itemCategory = Capitalize(itemData.category.name)
    const itemID = itemData.id
    const itemName = Capitalize(itemData.name)
    const itemSprite = itemData.sprites.default
    const arrayOfItemEffects: ArrayEffectsProps[] = itemData.effect_entries
    const itemEffects: string[] = []
    const itemAttributes: string[] = []

    for (const attribute of arrayOfItemsAttributes) {
      itemAttributes.push(attribute.name)
    }

    for (const effect of arrayOfItemEffects) {
      itemEffects.push(effect.effect)
    }

    items.push({
      id: itemID,
      name: itemName,
      sprite: itemSprite,
      effects: itemEffects,
      category: itemCategory,
      attributes: itemAttributes
    })
  }

  return {
    props: {
      items
    },
    revalidate: 86400
  }
}
