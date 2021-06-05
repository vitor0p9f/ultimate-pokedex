export interface BerryFlavorProps {
  name: string
  potency: number
}

export interface berryFlavor {
  flavor: {
    name: string
  }
  potency: number
}

export interface BerryProps {
  id: number
  name: string
  sprite: string
  firmness: string
  maxHarvest: number
  growthTime: number
  flavors: BerryFlavorProps[]
}

export interface BerriesProps {
  name: string
  url: string
}
