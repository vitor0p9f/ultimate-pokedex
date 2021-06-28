import getTypesColor from '@/globalFunctions/GetColorByType'
import { ViewItemsType } from '@/types/components/ImageCard'
import { Badge, Flex, FlexProps, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const MotionFlex = motion<FlexProps>(Flex)

type ComponentProps = {
  data: ViewItemsType
  onOpen?: () => void
  animation: boolean
  cursorPointer?: boolean
}

const ImageCard: React.FC<ComponentProps> = ({ data, onOpen, animation, cursorPointer }) => {
  const hoverAnimation = {
    y: '-4%',
    transition: {
      duration: 0.25
    }
  }

  return (
    <MotionFlex key={data.id}
      cursor={cursorPointer ? 'pointer' : 'default'}
      fontSize={['sm', 'md', 'lg']} flexDirection="column" alignItems="center" justifyContent="center" bgColor="#E0E0E0" borderRadius="20px"
      whileHover={animation ? hoverAnimation : {}}
      onClick={onOpen} boxShadow="md">

      <Image src={data.sprite} alt={data.name} width="100%" height="100%" />

      {data.types && (
        <Flex justify={data.types.length > 1 ? 'space-between' : 'center'} width="90%" marginBottom="2%">
          {data.types.map(type => (
            <Badge key={type} width={data.types && data.types.length > 1 ? '45%' : '80%'} variant="subtle" bgColor={getTypesColor(type)} fontSize={['sm', 'sm', 'xs']}>
              {type}
            </Badge>
          ))}
        </Flex>
      )}

      <Text>{data.name}</Text>
    </MotionFlex>
  )
}

export default ImageCard
