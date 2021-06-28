import BerryModal from '@/components/CustomModals/BerryModal'
import CustomSearchBar from '@/components/CustomSearchBar'
import Capitalize from '@/globalFunctions/Capitalize'
import AxiosPokeAPI from '@/services/api'
import { BerryProps } from '@/types/globalTypes'
import { BerriesProps, berryFlavor, BerryFlavorProps } from '@/types/pages/berries'
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import axios from 'axios'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useRef, useState } from 'react'

interface ComponentProps {
  berries: BerryProps[]
}

const Berries: React.FC<ComponentProps> = ({ berries }) => {
  const [currentBerries, setCurrentBerries] = useState(berries)
  const searchBarRef = useRef<HTMLInputElement>(null)

  const filterBerries = (): void => {
    const searchTerm = searchBarRef.current ? searchBarRef.current.value : ''

    const filteredBerries = berries.filter(berry => berry.name.toLowerCase().includes(searchTerm.toLowerCase()))

    setCurrentBerries(filteredBerries)
  }

  return (
    <>
      <Head>
        <title>Berries</title>
      </Head>

      <Flex flexDir="column" alignItems="center" paddingRight="5%" paddingLeft="5%" width="100%">
        <Box marginBottom="2%">
          <Text fontSize={['lg', '2xl', '4xl']} fontFamily="Josefin Sans" height="100%">Berries</Text>
        </Box>

        <CustomSearchBar ref={searchBarRef} onChange={filterBerries} />

        <SimpleGrid columns={[2, 4, 6]} spacing="30px" width="100%">
          {currentBerries.map(berry => (
            <BerryModal data={berry} key={berry.id} />
          ))}
        </SimpleGrid>
      </Flex>
    </>
  )
}

export default Berries

export const getStaticProps: GetStaticProps = async () => {
  const berries: BerryProps[] = []

  const { data: berriesData } = await AxiosPokeAPI.get('/berry/?limit=5') // limit 70

  const arrayOfBerries: BerriesProps[] = berriesData.results

  for (const berry of arrayOfBerries) {
    const { data: berryData } = await axios.get(berry.url)

    const berryID: number = berryData.id
    const berryGrowthTime: number = berryData.growth_time
    const berryMaxHarvest: number = berryData.max_harvest
    const berryFirmness = Capitalize(berryData.firmness.name)
    const berryFlavorsArray: berryFlavor[] = berryData.flavors
    const berryFlavors: BerryFlavorProps[] = []

    for (const flavor of berryFlavorsArray) {
      if (flavor.potency !== 0) {
        berryFlavors.push({
          name: Capitalize(flavor.flavor.name),
          potency: flavor.potency
        })
      }
    }

    const berryItemURL = berryData.item.url

    const { data: berryItemData } = await axios.get(berryItemURL)

    const berryName = Capitalize(berryItemData.name)
    const berrySprite: string = berryItemData.sprites.default

    berries.push({
      id: berryID,
      name: berryName,
      sprite: berrySprite,
      firmness: berryFirmness,
      maxHarvest: berryMaxHarvest,
      growthTime: berryGrowthTime,
      flavors: berryFlavors
    })
  }

  return {
    props: {
      berries: berries
    },
    revalidate: 86400
  }
}
