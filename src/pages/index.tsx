import Logo from '@/public/img/icons/PokePoint.svg'
import { Flex, Heading, Text } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Ultimate Pokédex</title>
      </Head>

      <Flex direction="column" width="100%" justifyContent="center" alignItems="center">
        <Heading display="flex" direction="row" fontFamily="Josefin Sans">
          <Text marginRight="2%">Ultimate</Text>
          <Image src={Logo} alt="Logo" width="60%" height="60%" />
          <Text marginLeft="2%">Pokédex</Text>
        </Heading>

        <Text width="60%" textAlign="justify" marginTop="2%" fontSize={['sm', 'lg']}>
          This project was developed in order to improve my knowledge about front-end development. For its creation, we used the concepts of generating static pages, or SGG as it is called within the Next.js ecosystem.
        </Text>
      </Flex>
    </>
  )
}

export default Home
