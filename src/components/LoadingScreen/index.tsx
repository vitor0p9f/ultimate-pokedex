import { Flex, Heading, Spinner } from '@chakra-ui/react'

const LoadingScreen: React.FC = () => {
  return (
    <Flex width="100vw" height="100vh" direction="column" alignItems="center" justifyContent="center">
      <Spinner size="xl" />
      <Heading as="h1" size="lg">
        Loading Content
      </Heading>
    </Flex>
  )
}

export default LoadingScreen
