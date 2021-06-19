import { ChakraProvider, CSSReset, extendTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

const themeConfig = extendTheme({
  styles: {
    global: {
      'html, body': {
        backgroundColor: '#FAFAFA',
        color: '#22252A',
        fontFamily: 'Josefin Sans'
      }
    }
  }
})

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ChakraProvider theme={themeConfig}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
