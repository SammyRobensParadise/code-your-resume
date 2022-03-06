import type { NextPage } from 'next'
import React, { useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import GridLayout from 'react-grid-layout'

const layout = [
  { i: 'left', x: 0, y: 0, w: 6, h: 24, static: true },
  { i: 'right', x: 6, y: 0, w: 6, h: 24 }
]

const Home: NextPage = () => {
  function handleMessage(message: MessageEvent) {
    console.log(message)
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
          <iframe src="/code-editor" width="100%" height="100%" />
        </div>
        <div key="right">
          <iframe src="/viewer" width="100%" height="100%" />
        </div>
      </GridLayout>
    </div>
  )
}

export default Home
