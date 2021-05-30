import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import axios from 'axios'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import Navbar from '../../components/Navbar'
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
  const router = useRouter()
  return (
    <>
      <Navbar />
      <Flex justifyContent="center" alignItems="center">
        <SimpleGrid columns={4} spacing="50px">
          {berries.map(berry => (
            <Box key={berry.id} cursor="pointer"
              display="flex" flexDirection="column" alignItems="center" justifyContent="center" onClick={() => { router.push(`/berries/${berry.id}`) }} _hover={{
                color: '#666666'
              }}>

              <Image src={berry.sprite} alt={berry.name} width="5rem" height="5rem" margin="0"></Image>
              <Text>{berry.name}</Text>
            </Box>
          ))}
        </SimpleGrid>
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
    }
  }
}
