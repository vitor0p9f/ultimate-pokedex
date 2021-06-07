import { ItemProps } from '@/types/globalTypes'
import { ArrayAttributesProps, ArrayEffectsProps, ItemSchema } from '@/types/pages/items'
import { Flex, SimpleGrid } from '@chakra-ui/react'
import axios from 'axios'
import { GetStaticProps } from 'next'
import { useRef, useState } from 'react'
import ItemsModal from 'src/components/CustomModals/ItemsModal'
import CustomSearchBar from 'src/components/CustomSearchBar'
import Navbar from 'src/components/Navbar'
import Capitalize from '../../globalFunctions/Capitalize'
import AxiosPokeAPI from '../../services/api'

interface ComponentProps {
  items: ItemProps[]
}

const Items: React.FC<ComponentProps> = ({ items }) => {
  const [currentItems, setCurrentItems] = useState(items)
  const searchBarRef = useRef<HTMLInputElement>(null)

  function filterItems(): void {
    const searchTerm = searchBarRef.current ? searchBarRef.current.value : ''

    const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

    setCurrentItems(filteredItems)
  }

  return (
    <>
      <Navbar />

      <Flex flexDir="column" alignItems="center" paddingRight="5%" paddingLeft="5%" width="100%">
        <CustomSearchBar ref={searchBarRef} onChange={filterItems} />

        <SimpleGrid columns={6} spacing="50px" width="100%">
          {currentItems.map(item => (
            <ItemsModal data={item} key={item.id} />
          ))}
        </SimpleGrid>
      </Flex>
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
