import { Flex } from '@chakra-ui/react'
import axios from 'axios'
import { GetStaticProps } from 'next'
import Navbar from '@/components/Navbar'
import RenderTextCards from '@/components/RenderTextCards'
import AxiosPokeAPI from '../../services/api'

interface NatureProps {
  name: string
  id: number
}

interface NatureSchema {
  name: string
  url: string
}

interface ComponentProps {
  natures: NatureProps[]
}

const Natures: React.FC<ComponentProps> = ({ natures }) => {
  return (
    <>
      <Navbar />
      <Flex justifyContent="center" alignItems="center">
        <RenderTextCards items={natures} path="natures" />
      </Flex>
    </>
  )
}

export default Natures

export const getStaticProps: GetStaticProps = async () => {
  const natures: NatureProps[] = []

  const { data: naturesData } = await AxiosPokeAPI.get('/nature?limit=30')

  const naturesArray: NatureSchema[] = naturesData.results

  for (const nature of naturesArray) {
    const { data: natureData } = await axios.get(nature.url)

    const natureID = natureData.id
    const natureName = natureData.name

    natures.push({
      id: natureID,
      name: natureName
    })
  }

  return {
    props: {
      natures
    },
    revalidate: 86400
  }
}
