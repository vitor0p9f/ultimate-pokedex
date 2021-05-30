import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import AxiosPokeAPI from '../../services/api'

interface ItemSchema {
  name: string
  url: string
}

interface ItemProps {
  name: string
  id: string
  sprite: string
}

export default async(req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'GET') {
    const items: Array<ItemProps> = []
    const { data: itemsData } = await AxiosPokeAPI.get('/item/?limit=1000')

    const itemsArray: Array<ItemSchema> = itemsData.results

    for (const item of itemsArray) {
      const { data: itemData } = await axios.get(item.url)

      const itemID = itemData.id
      const itemSprite = itemData.sprites.default
      const itemName = itemData.name

      items.push({
        name: itemName,
        id: itemID,
        sprite: itemSprite
      })

      console.log({
        name: itemName,
        id: itemID,
        sprite: itemSprite
      })
    }
    return res.status(200).json(items)
  }
}
