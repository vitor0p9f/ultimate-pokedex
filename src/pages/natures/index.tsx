import NatureModal from '@/components/CustomModals/NatureModal'
import { NatureProps } from '@/types/globalTypes'
import { NatureSchema, NatureStatusChange, NatureStatusSchema } from '@/types/pages/natures'
import { SimpleGrid } from '@chakra-ui/react'
import axios from 'axios'
import { GetStaticProps } from 'next'
import Navbar from 'src/components/Navbar'
import Capitalize from 'src/globalFunctions/Capitalize'
import AxiosPokeAPI from '../../services/api'

interface ComponentProps {
  natures: NatureProps[]
}

const Natures: React.FC<ComponentProps> = ({ natures }) => {
  return (
    <>
      <Navbar />
      <SimpleGrid columns={[2, 4, 6]} spacing="20px" paddingRight="5%" paddingLeft="5%" width="100%">
        {natures.map(nature => (
          <NatureModal key={nature.id} data={nature} />
        ))}
      </SimpleGrid>
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

    const natureName = Capitalize(natureData.name)
    const natureID = natureData.id
    const natureDecreasedStat = natureData.decreased_stat !== null ? natureData.decreased_stat.name : 'none'
    const natureIncreasedStat = natureData.increased_stat !== null ? natureData.increased_stat.name : 'none'
    const natureHatesFlavor = natureData.hates_flavor !== null ? Capitalize(natureData.hates_flavor.name) : 'none'
    const natureLikesFlavor = natureData.likes_flavor !== null ? Capitalize(natureData.likes_flavor.name) : 'none'
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
