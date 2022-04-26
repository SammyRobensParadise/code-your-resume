import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Subscribe } from '@react-rxjs/core'

interface App extends AppProps {
  pageProps: Record<string, unknown>
}
function Entry({ Component, pageProps }: App) {
  return (
    <ChakraProvider>
      <Subscribe>
        <Component {...pageProps} />
      </Subscribe>
    </ChakraProvider>
  )
}

export default Entry
