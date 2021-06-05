import { SimpleGrid } from '@chakra-ui/react'
import axios from 'axios'
import { GetStaticProps } from 'next'
import BerriesModal from '@/components/CustomModals/BerriesModal'
import Navbar from '@/components/Navbar'
import Capitalize from '../../globalFunctions/Capitalize'
import { BerriesProps, berryFlavor, BerryFlavorProps, BerryProps } from '@/interfaces/pages/berries'
import AxiosPokeAPI from '../../services/api'

export interface ComponentProps {
  berries: BerryProps[]
}

const Berries: React.FC<ComponentProps> = ({ berries }) => {
  return (
    <>
      <Navbar />
      <SimpleGrid columns={6} spacing="50px" marginRight="5%" marginLeft="5%">
        {berries.map(berry => (
          <BerriesModal data={berry} key={berry.id} />
        ))}
      </SimpleGrid>
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

    const berryID: number = berryData.id
    const berryGrowthTime: number = berryData.growth_time
    const berryMaxHarvest: number = berryData.max_harvest
    const berryFirmness = Capitalize(berryData.firmness.name)
    const berryFlavorsArray: berryFlavor[] = berryData.flavors
    const berryFlavors: BerryFlavorProps[] = []

    for (const flavor of berryFlavorsArray) {
      berryFlavors.push({
        name: flavor.flavor.name,
        potency: flavor.potency
      })
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
