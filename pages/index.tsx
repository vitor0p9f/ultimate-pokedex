import Head from 'next/head'
import Navbar from '../components/Navbar'

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
