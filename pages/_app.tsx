import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Footer from '../components/footer/footer'

interface App extends AppProps {
  pageProps: Record<string, unknown>
}
function Entry({ Component, pageProps }: App) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default Entry
