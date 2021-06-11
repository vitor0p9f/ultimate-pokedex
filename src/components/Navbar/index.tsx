import { Box, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'

const Navbar: React.FC = () => {
  const router = useRouter()

  return (
    <Flex width="100%" justifyContent="space-between">
      <Box fontSize={['sm', 'md', 'lg']} padding=" 0 1em" cursor="pointer" onClick={() => { router.push('/', undefined, { shallow: true }) }}>Home</Box>
      <Box fontSize={['sm', 'md', 'lg']} padding=" 0 1em" cursor="pointer" onClick={() => { router.push('/berries', undefined, { shallow: true }) }}>Berries</Box>
      <Box fontSize={['sm', 'md', 'lg']} padding=" 0 1em" cursor="pointer" onClick={() => { router.push('/items', undefined, { shallow: true }) }}>Items</Box>
      <Box fontSize={['sm', 'md', 'lg']} padding=" 0 1em" cursor="pointer" onClick={() => { router.push('/regions', undefined, { shallow: true }) }}>Regions</Box>
      <Box fontSize={['sm', 'md', 'lg']} padding=" 0 1em" cursor="pointer" onClick={() => { router.push('/natures', undefined, { shallow: true }) }}>Natures</Box>
    </Flex>
  )
}

export default Navbar
