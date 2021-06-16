import getTypesColor from '@/globalFunctions/GetColorByType'
import { Badge, Box, BoxProps, Flex, Image, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion<BoxProps>(Box)

type ViewItemsType = {
  name: string
  id: number
  types?: string[]
  sprite: string
}

type ComponentProps = {
  data: ViewItemsType
  onOpen?: () => void
  animation: boolean
}

const ImageCard: React.FC<ComponentProps> = ({ data, onOpen, animation }) => {
  const hoverAnimation = {
    y: '-4%',
    transition: {
      duration: 0.25
    }
  }

  return (
    <MotionBox key={data.id} cursor="pointer" display="flex"
      fontSize={['sm', 'md', 'lg']} flexDirection="column" alignItems="center" justifyContent="center" bgColor="#dadad8" borderRadius="20px"
      whileHover={animation ? hoverAnimation : {}}
      onClick={onOpen} >

      <Image src={data.sprite} alt={data.name} width="100%" height="100%" />

      {data.types && (
        <Flex justify={data.types.length > 1 ? 'space-between' : 'center'} width="90%">
          {data.types.map(type => (
            <Badge key="" width={data.types && data.types.length > 1 ? '45%' : '80%'} textAlign="center" variant="subtle" bgColor={getTypesColor(type)} fontSize={['xs', 'sm']}>
              {type}
            </Badge>
          ))}
        </Flex>
      )}

      <Text>{data.name}</Text>
    </MotionBox>
  )
}

export default ImageCard
