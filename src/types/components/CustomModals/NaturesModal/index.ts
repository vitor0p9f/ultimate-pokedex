type NatureStatusSchema = {
  name: string
  maxChange: number
}

export type NatureProps = {
  name: string,
  id: number,
  increasedStat: string,
  decreasedStat: string,
  likesFlavor: string,
  hatesFlavor: string
  statusChange: NatureStatusSchema[]
}
