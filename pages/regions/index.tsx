import { Flex } from '@chakra-ui/react'
import axios from 'axios'
import { GetStaticProps } from 'next'
import Navbar from '../../components/Navbar'
import RenderTextCards from '../../components/RenderTextCards'
import AxiosPokeAPI from '../../services/api'

interface RegionProps {
  name: string
  id: number
}

interface RegionSchema {
  name: string
  url: string
}

interface ComponentProps {
  regions: RegionProps[]
}

const Regions: React.FC<ComponentProps> = ({ regions }) => {
  return (
    <>
      <Navbar />
      <Flex justifyContent="center" alignItems="center">
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
