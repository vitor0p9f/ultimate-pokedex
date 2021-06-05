export interface ItemProps {
  id: number
  name: string
  category: string
  sprite: string
  effects: string[]
  attributes: string[]
}

export interface ComponentProps {
  data: ItemProps
}
