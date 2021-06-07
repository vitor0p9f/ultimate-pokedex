const getTypesColor = (type: string): string => {
  const typesColor: any = {
    Normal: '#a0a29f',
    Fighting: '#d3425f',
    Flying: '#a1bbec',
    Poison: '#b763cf',
    Ground: '#da7c4d',
    Rock: '#c9bc8a',
    Bug: '#92bd2d',
    Ghost: '#5f6dbc',
    Steel: '#5795a3',
    Fire: '#fba64c',
    Grass: '#60bd58',
    Water: '#539ddf',
    Electric: '#f2d94e',
    Psychic: '#fa8582',
    Ice: '#76d1c1',
    Dragon: '#0c6ac8',
    Dark: '#595761',
    Fairy: '#ef90e6'
  }

  return typesColor[type]
}

export default getTypesColor
