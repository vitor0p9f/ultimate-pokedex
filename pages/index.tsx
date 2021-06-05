import Navbar from '@/components/Navbar'
import Head from 'next/head'

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Ultimate Pokédex</title>
      </Head>
      <Navbar />
    </>
  )
}

export default Home
