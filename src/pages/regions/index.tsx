import TextCard from '@/components/TextCard'
import Capitalize from '@/globalFunctions/Capitalize'
import { RegionProps, RegionSchema } from '@/types/pages/regions'
import { Box, Center, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import axios from 'axios'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import AxiosPokeAPI from '../../services/api'

interface ComponentProps {
  regions: RegionProps[]
}

const Regions: React.FC<ComponentProps> = ({ regions }) => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Regions</title>
      </Head>

      <Flex flexDir="column" alignItems="center" paddingRight="5%" paddingLeft="5%" width="100%">
        <Box>
          <Text fontSize={['lg', '2xl', '4xl']} fontFamily="Josefin Sans" height="100%">
            Regions
          </Text>
        </Box>

        <SimpleGrid columns={[2, 4, 6]} spacing="30px" paddingRight="5%" paddingLeft="5%" width="100%" marginTop="2%">
          {regions.map(region => (
            <Center key={region.id}>
              <TextCard onClick={() => { router.push(`/regions/${region.id}`) }}>{region.name}</TextCard>
            </Center>
          ))}
        </SimpleGrid>
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
    const regionName = Capitalize(regionData.name)

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
