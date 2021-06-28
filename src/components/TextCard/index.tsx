import { Flex, FlexProps, Text } from '@chakra-ui/layout'
import { motion } from 'framer-motion'

const MotionFlex = motion<FlexProps>(Flex)

const hoverAnimation = {
  y: '-5%',
  transition: {
    duration: 0.25
  }
}

type ComponentProps = {
  onClick?: () => void
}

const TextCard: React.FC<ComponentProps> = ({ children, onClick }) => {
  return (
    <MotionFlex cursor="pointer" alignItems="center" justifyContent="center" fontSize={['sm', 'md', 'lg']} bgColor="#EEEEEE" whileHover={hoverAnimation} width="100%" p="2" borderRadius="10px" boxShadow="md" onClick={onClick}>
      <Text>{children}</Text>
    </MotionFlex>
  )
}

export default TextCard
