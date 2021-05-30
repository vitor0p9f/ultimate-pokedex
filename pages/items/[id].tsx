import { Center, Flex, Text } from '@chakra-ui/layout'
import { Image, Spinner } from '@chakra-ui/react'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import AxiosPokeAPI from '../../services/api'

interface ArrayAttributesProps {
  name: string
  url: string
}

interface ArrayEffectsProps {
  effect: string
  language: {
    name: string
    url: string
  },
  // eslint-disable-next-line camelcase
  short_effect: string
}

interface ItemProps {
  id: number
  name: string
  category: string
  sprite: string
  effects: string[]
}

interface ComponentProps {
  item: ItemProps
}

interface ArrayItemsSchema {
  name: string
  url: string
}

const Item: React.FC<ComponentProps> = ({ item }) => {
  const { isFallback } = useRouter()

  if (isFallback) return <Center><Spinner size="xl" /></Center>

  return (
    <Flex direction="column">
      <Image src={item.sprite} alt={item.name} width="5rem" height="5rem" margin="0"></Image>
      <Text>{item.name}</Text>
      <Text>{item.category}</Text>
      {item.effects.map(effect => (
        <Text key="">{effect}</Text>
      ))}
    </Flex>
  )
}

export default Item

export const getStaticPaths: GetStaticPaths = async () => {
  const itemsID: string[] = []

  const { data: itemsData } = await AxiosPokeAPI.get('/item')

  const itemsArray: ArrayItemsSchema[] = itemsData.results

  for (const item of itemsArray) {
    const { data: itemData } = await axios.get(item.url)

    const itemID = String(itemData.id)

    itemsID.push(itemID)
  }

  const paths = itemsID.map(itemID => ({
    params: { id: itemID }
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const item: ItemProps = Object()
  const attributes: string[] = []

  const { data: itemData } = await AxiosPokeAPI.get(`/item/${context.params?.id}`)

  const arrayOfItemsAttributes: ArrayAttributesProps[] = itemData.attributes
  const itemCategory = itemData.category.name
  const itemID = itemData.id
  const itemName = itemData.name
  const itemSprite = itemData.sprites.default
  const arrayOfItemEffects: ArrayEffectsProps[] = itemData.effect_entries
  const itemEffects: string[] = []

  for (const attribute of arrayOfItemsAttributes) {
    attributes.push(attribute.name)
  }

  for (const effect of arrayOfItemEffects) {
    itemEffects.push(effect.effect)
  }

  const itemSchema = {
    id: itemID,
    name: itemName,
    sprite: itemSprite,
    effects: itemEffects,
    category: itemCategory
  }

  Object.assign(item, itemSchema)

  return {
    props: {
      item
    }
  }
}
