import NatureModal from '@/components/CustomModals/NatureModal'
import Capitalize from '@/globalFunctions/Capitalize'
import { NatureProps } from '@/types/globalTypes'
import { NatureSchema, NatureStatusChange, NatureStatusSchema } from '@/types/pages/natures'
import { Box, Center, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import axios from 'axios'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import AxiosPokeAPI from '../../services/api'

interface ComponentProps {
  natures: NatureProps[]
}

const Natures: React.FC<ComponentProps> = ({ natures }) => {
  return (
    <>
      <Head>
        <title>Natures</title>
      </Head>

      <Flex flexDir="column" alignItems="center" paddingRight="5%" paddingLeft="5%" width="100%">
        <Box>
          <Text fontSize={['lg', '2xl', '4xl']} fontFamily="Josefin Sans" height="100%">
            Natures
          </Text>
        </Box>

        <SimpleGrid columns={[2, 4, 6]} spacing="30px" paddingRight="5%" paddingLeft="5%" width="100%" marginTop="2%">
          {natures.map(nature => (
            <Center key="">
              <NatureModal key={nature.id} data={nature} />
            </Center>
          ))}
        </SimpleGrid>
      </Flex>
    </>
  )
}

export default Natures

export const getStaticProps: GetStaticProps = async () => {
  const natures: NatureProps[] = []

  const { data: naturesData } = await AxiosPokeAPI.get('/nature?limit=5') // limit 30

  const naturesArray: NatureSchema[] = naturesData.results

  for (const nature of naturesArray) {
    const { data: natureData } = await axios.get(nature.url)

    const natureName = Capitalize(natureData.name)
    const natureID = natureData.id
    const natureDecreasedStat = natureData.decreased_stat !== null ? Capitalize(natureData.decreased_stat.name) : 'None'

    const natureIncreasedStat = natureData.increased_stat !== null ? Capitalize(natureData.increased_stat.name) : 'None'

    const natureHatesFlavor = natureData.hates_flavor !== null ? Capitalize(natureData.hates_flavor.name) : 'None'

    const natureLikesFlavor = natureData.likes_flavor !== null ? Capitalize(natureData.likes_flavor.name) : 'None'

    const natureStatusChangeArray: NatureStatusChange[] = natureData.pokeathlon_stat_changes
    const natureStatusChange: NatureStatusSchema[] = []

    for (const status of natureStatusChangeArray) {
      const statusSchema = {
        name: Capitalize(status.pokeathlon_stat.name),
        maxChange: status.max_change
      }

      natureStatusChange.push(statusSchema)
    }

    natures.push({
      name: natureName,
      id: natureID,
      increasedStat: natureIncreasedStat,
      decreasedStat: natureDecreasedStat,
      likesFlavor: natureLikesFlavor,
      hatesFlavor: natureHatesFlavor,
      statusChange: natureStatusChange
    })
  }

  return {
    props: {
      natures
    },
    revalidate: 86400
  }
}
