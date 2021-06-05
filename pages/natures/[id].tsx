import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import AxiosPokeAPI from '../../services/api'

interface ArrayRegionsSchema {
  name: string
  url: string
}

interface NatureStatusChange {
  // eslint-disable-next-line camelcase
  max_change: number
  // eslint-disable-next-line camelcase
  pokeathlon_stat: {
    name: string,
    url: string
  }
}

interface NatureStatusSchema {
  name: string
  maxChange: number
}

interface NatureProps {
  name: string,
  id: number,
  increasedStat: string,
  decreasedStat: string,
  likesFlavor: string,
  hatesFlavor: string
  statusChange: NatureStatusSchema[]
}

interface ComponentProps {
  nature: NatureProps
}

const Nature: React.FC<ComponentProps> = () => {
  return (
    <h1>Pagina das natures</h1>
  )
}

export default Nature

export const getStaticPaths: GetStaticPaths = async () => {
  const naturesID: string[] = []

  const { data: naturesData } = await AxiosPokeAPI.get('/nature?limit=30')

  const naturesArray: ArrayRegionsSchema[] = naturesData.results

  for (const nature of naturesArray) {
    const { data: natureData } = await axios.get(nature.url)

    const itemID = String(natureData.id)

    naturesID.push(itemID)
  }

  const paths = naturesID.map(natureID => ({
    params: { id: natureID }
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const nature: NatureProps = Object()

  const { data: natureData } = await AxiosPokeAPI.get(`/nature/${context.params?.id}`)

  const natureName = natureData.name
  const natureID = natureData.id
  const natureDecreasedStat = natureData.decreased_stat !== null ? natureData.decreased_stat.name : 'none'
  const natureIncreasedStat = natureData.increased_stat !== null ? natureData.increased_stat.name : 'none'
  const natureHatesFlavor = natureData.hates_flavor !== null ? natureData.hates_flavor.name : 'none'
  const natureLikesFlavor = natureData.likes_flavor !== null ? natureData.likes_flavor.name : 'none'
  const natureStatusChangeArray: NatureStatusChange[] = natureData.pokeathlon_stat_changes
  const natureStatusChange: NatureStatusSchema[] = []

  for (const status of natureStatusChangeArray) {
    const statusSchema = {
      name: status.pokeathlon_stat.name,
      maxChange: status.max_change
    }

    natureStatusChange.push(statusSchema)
  }

  const natureSchema = {
    name: natureName,
    id: natureID,
    increasedStat: natureIncreasedStat,
    decreasedStat: natureDecreasedStat,
    likesFlavor: natureLikesFlavor,
    hatesFlavor: natureHatesFlavor,
    statusChange: natureStatusChange
  }

  Object.assign(nature, natureSchema)

  return {
    props: {
      nature
    },
    revalidate: 86400
  }
}
