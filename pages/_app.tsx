import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { useHydrateAtoms } from 'jotai/utils';
import { files } from '../state/local/files';
import { Atom } from 'jotai';

interface App extends AppProps {
  pageProps: Record<string, unknown>;
}
function Entry({ Component, pageProps }: App) {
  const { initialState } = pageProps;
  const initStateTypeMap = initialState as Iterable<readonly [Atom<unknown>, unknown]>;

  // @ts-expect-error
  useHydrateAtoms(initialState ? [[files, initStateTypeMap]] : []);

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default Entry;
