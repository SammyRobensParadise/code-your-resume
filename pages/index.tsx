import type { NextPage } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Message } from '../types'
import { Button, Flex, Grid, GridItem, Box, Tooltip } from '@chakra-ui/react'
import Footer from '../components/footer/footer'
import Sidebar from '../components/sidebar/sidebar'
import { ExternalLinkIcon } from '@chakra-ui/icons'
const layout = [
  { i: 'left', x: 0, y: 0, w: 6, h: 24, static: true },
  { i: 'right', x: 6, y: 0, w: 6, h: 24 }
]

const Home: NextPage = () => {
  const editorRef = useRef<HTMLIFrameElement>(null)
  const viewerRef = useRef<HTMLIFrameElement>(null)
  const [popoutViewer, setPopoutViewer] = useState<Window | null>(null)
  function handleMessage(message: MessageEvent<Message>) {
    const { destination } = message.data
    if (destination === 'viewer' && viewerRef.current) {
      if (popoutViewer) {
        popoutViewer.postMessage(
          message.data,
          `${window.location.origin}/viewer`
        )
      }
      viewerRef.current.contentWindow?.postMessage(
        message.data,
        `${window.location.origin}/viewer`
      )
    }
    if (destination === 'editor' && editorRef.current) {
      editorRef.current.contentWindow?.postMessage(message.data)
    }
  }

  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  })

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.height = `${window.innerHeight - 90}px`
    }
    if (viewerRef.current) {
      viewerRef.current.height = `${window.innerHeight - 90}px`
    }
  })
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Code Your Resume</title>
          <meta name="description" content="Code your Resume" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Flex backgroundColor="white">
          <Sidebar />
          <Grid
            templateColumns="repeat(2, 1fr)"
            gap={2}
            width="100%"
            height="-moz-max-content"
          >
            <GridItem w="100%" h="auto">
              <iframe
                src="/code-editor"
                width="100%"
                height="100%"
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
                <Tooltip label="Open Viewer in New Tab">
                  <Button
                    size="xs"
                    onClick={() => setPopoutViewer(window.open('/viewer'))}
                  >
                    <ExternalLinkIcon mx="2px" />
                  </Button>
                </Tooltip>
              </Box>
              <iframe
                src="/viewer"
                width="100%"
                height="100%"
                title="viewer"
                ref={viewerRef}
              />
            </GridItem>
          </Grid>
          <div></div>
        </Flex>
      </div>
      <Footer />
    </>
  )
}

export default Home
