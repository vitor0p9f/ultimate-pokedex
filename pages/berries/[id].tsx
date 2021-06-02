import { Flex, Image, Text } from '@chakra-ui/react'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import LoadingScreen from '../../components/LoadingScreen'
import Capitalize from '../../globalFunctions/Capitalize'
import AxiosPokeAPI from '../../services/api'

interface BerryProps {
  id: number,
  name: string,
  sprite: string,
  firmness: string,
  maxHarvest: number,
  growthTime: number
}

interface ComponentProps {
  berry: BerryProps
}

interface ArrayBerriesSchema {
  name: string
  url: string
}

const Berry: React.FC<ComponentProps> = ({ berry }) => {
  const { isFallback } = useRouter()

  if (isFallback) return <LoadingScreen />

  return (
    <Flex direction="column">
      <Image src={berry.sprite} alt={berry.name} width="5rem" height="5rem" margin="0"></Image>
      <Text>Name: {berry.name}</Text>
      <Text>Firmness: {berry.firmness}</Text>
      <Text>Growth Time: {berry.growthTime}</Text>
      <Text>Max Harvest: {berry.maxHarvest}</Text>
    </Flex>
  )
}

export default Berry

export const getStaticPaths: GetStaticPaths = async () => {
  const berriesID: string[] = []

  const { data: berriesData } = await AxiosPokeAPI.get('/berry')

  const berriesArray: ArrayBerriesSchema[] = berriesData.results

  for (const berry of berriesArray) {
    const { data: berryData } = await axios.get(berry.url)

    const berryID = String(berryData.id)

    berriesID.push(berryID)
  }

  const paths = berriesID.map(barryID => ({
    params: { id: barryID }
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const berry: BerryProps = Object()

  const { data: berryData } = await AxiosPokeAPI.get(`/berry/${context.params?.id}`)

  const berryID = berryData.id
  const berryGrowthTime = berryData.growth_time
  const berryMaxHarvest = berryData.max_harvest
  const berryFirmness = Capitalize(berryData.firmness.name)
  const berryItemURL = berryData.item.url

  const { data: berryItemData } = await axios.get(berryItemURL)

  const berryName = Capitalize(berryItemData.name)
  const berrySprite = berryItemData.sprites.default

  const berrySchema = {
    id: berryID,
    name: berryName,
    sprite: berrySprite,
    firmness: berryFirmness,
    maxHarvest: berryMaxHarvest,
    growthTime: berryGrowthTime
  }

  Object.assign(berry, berrySchema)

  return {
    props: {
      berry
    },
    revalidate: 86400
  }
}
