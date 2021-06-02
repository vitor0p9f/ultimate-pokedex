import { Flex } from '@chakra-ui/react'
import axios from 'axios'
import { GetStaticProps } from 'next'
import Navbar from '../../components/Navbar'
import RenderItemCards from '../../components/RenderItemCards'
import AxiosPokeAPI from '../../services/api'

interface BerryProps {
  id: number
  name: string
  sprite: string
}

interface BerriesProps {
  name: string
  url: string
}

interface BerryItemProps {
  name: string
  url: string
}

interface ComponentProps {
  berries: BerryProps[]
}

const Berries: React.FC<ComponentProps> = ({ berries }) => {
  return (
    <>
      <Navbar />
      <Flex justifyContent="center" alignItems="center">
        <RenderItemCards items={berries} path="berries" />
      </Flex>
    </>
  )
}

export default Berries

export const getStaticProps: GetStaticProps = async () => {
  const berries: BerryProps[] = []

  const { data: berriesData } = await AxiosPokeAPI.get('/berry/?limit=70')

  const arrayOfBerries: BerriesProps[] = berriesData.results

  for (const berry of arrayOfBerries) {
    const { data: berryData } = await axios.get(berry.url)

    const berryName = berryData.name
    const berryID = berryData.id
    const berryItem: BerryItemProps = berryData.item

    const { data: berryItemData } = await axios.get(berryItem.url)

    const berrySprite = berryItemData.sprites.default

    const berrySchema = {
      id: berryID,
      name: berryName,
      sprite: berrySprite
    }

    berries.push(berrySchema)
  }

  return {
    props: {
      berries: berries
    },
    revalidate: 86400
  }
}
