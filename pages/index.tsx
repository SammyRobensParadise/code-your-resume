import type { NextPage } from 'next';
import { useState } from 'react';

import Head from 'next/head';
import styles from '../styles/Home.module.css';
import GridLayout from 'react-grid-layout';
import EditorContainer from '../components/editor/editor-container';

const Home: NextPage = () => {
  const layout = [
    { i: 'left', x: 0, y: 0, w: 6, h: 12, static: true },
    { i: 'right', x: 6, y: 0, w: 6, h: 12 },
  ];
  return (
    <div className={styles.container}>
      <Head>
        <title>Code Your Resume</title>
        <meta name='description' content='Code your Resume' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <GridLayout className='layout' layout={layout} cols={12} rowHeight={30} width={1200}>
        <div key='left'>
          <EditorContainer />
        </div>
        <div key='right'>b</div>
      </GridLayout>
    </div>
  );
};

export default Home;
