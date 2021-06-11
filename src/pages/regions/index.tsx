import { RegionProps, RegionSchema } from '@/types/pages/regions'
import { Flex } from '@chakra-ui/react'
import axios from 'axios'
import { GetStaticProps } from 'next'
import Navbar from 'src/components/Navbar'
import RenderTextCards from 'src/components/RenderTextCards'
import AxiosPokeAPI from '../../services/api'

interface ComponentProps {
  regions: RegionProps[]
}

const Regions: React.FC<ComponentProps> = ({ regions }) => {
  return (
    <>
      <Navbar />

      <Flex justifyContent="center" width="100%" paddingLeft="5%" paddingRight="5%">
        <RenderTextCards items={regions} path="regions" />
      </Flex>
    </>
  )
}

export default Regions

export const getStaticProps: GetStaticProps = async () => {
  const regions: RegionProps[] = []

  const { data: regionsData } = await AxiosPokeAPI.get('/region')

  const regionsArray: RegionSchema[] = regionsData.results

  for (const region of regionsArray) {
    const { data: regionData } = await axios.get(region.url)

    const regionID = regionData.id
    const regionName = regionData.name

    regions.push({
      id: regionID,
      name: regionName
    })
  }

  return {
    props: {
      regions
    },
    revalidate: 86400
  }
}
