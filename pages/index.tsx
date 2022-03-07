import type { NextPage } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import GridLayout from 'react-grid-layout'
import { Message } from '../types'
import { Button } from '@chakra-ui/react'

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
  return (
    <div className={styles.container}>
      <Head>
        <title>Code Your Resume</title>
        <meta name="description" content="Code your Resume" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
      >
        <div key="left">
          <iframe
            src="/code-editor"
            width="100%"
            height="100%"
            title="editor"
            ref={editorRef}
          />
        </div>
        <div key="right">
          <iframe
            src="/viewer"
            width="100%"
            height="100%"
            title="viewer"
            ref={viewerRef}
          />
        </div>
      </GridLayout>
      <div>
        <Button
          onClick={() => {
            setPopoutViewer(window.open('/viewer'))
          }}
        >
          Open In New Tab
        </Button>
      </div>
    </div>
  )
}

export default Home
