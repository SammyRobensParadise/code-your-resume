import type { NextPage } from 'next'
import React, { useEffect, useRef } from 'react'
import Head from 'next/head'
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Box,
  Tooltip,
  Text
} from '@chakra-ui/react'
import Footer from '../components/footer/footer'
import { ExternalLinkIcon } from '@chakra-ui/icons'

const Home: NextPage = () => {
  const editorRef = useRef<HTMLIFrameElement>(null)
  const viewerRef = useRef<HTMLIFrameElement>(null)

  function handleWindowResize() {
    if (editorRef.current) {
      editorRef.current.height = `${window.innerHeight - 91}px`
    }
    if (viewerRef.current) {
      viewerRef.current.height = `${window.innerHeight - 91}px`
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  })

  useEffect(() => {
    handleWindowResize()
  })

  return (
    <>
      <Head>
        <title>Code Your Resume</title>
        <meta name="description" content="Code your Resume" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex backgroundColor="white">
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={2}
          width="100%"
          height="-moz-max-content"
        >
          <GridItem w="100%">
            <Box
              padding={1}
              borderRadius={4}
              borderWidth="1px"
              borderColor="gray.700"
              margin={1}
            >
              <Flex>
                <Text paddingX={4}>Editor</Text>
                <Tooltip label="Open Editor in New Tab">
                  <Button size="xs" onClick={() => window.open('/code-editor')}>
                    <ExternalLinkIcon mx="2px" />
                  </Button>
                </Tooltip>
              </Flex>
            </Box>
            <iframe
              src="/code-editor"
              width="100%"
              title="editor"
              ref={editorRef}
            />
          </GridItem>
          <GridItem w="100%" h="auto">
            <Box
              padding={1}
              borderRadius={4}
              borderWidth="1px"
              borderColor="gray.700"
              margin={1}
            >
              <Flex>
                <Text paddingX={4}>Viewer</Text>
                <Tooltip label="Open Viewer in New Tab">
                  <Button size="xs" onClick={() => window.open('/viewer')}>
                    <ExternalLinkIcon mx="2px" />
                  </Button>
                </Tooltip>
              </Flex>
            </Box>
            <iframe src="/viewer" width="100%" title="viewer" ref={viewerRef} />
          </GridItem>
        </Grid>
      </Flex>
      <Footer />
    </>
  )
}

export default Home
