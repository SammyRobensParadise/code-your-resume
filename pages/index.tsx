import type { NextPage } from 'next';
import { useState } from 'react';

import Head from 'next/head';
import styles from '../styles/Home.module.css';
import GridLayout from 'react-grid-layout';

const Home: NextPage = () => {
  const [postBody, setPostBody] = useState('');
  const layout = [
    { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
    { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2 },
  ];
  return (
    <div className={styles.container}>
      <Head>
        <title>Code Your Resume</title>
        <meta name='description' content='Code your Resume' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <GridLayout className='layout' layout={layout} cols={12} rowHeight={30} width={1200}>
        <div key='a'>a</div>
        <div key='b'>b</div>
        <div key='c'>c</div>
      </GridLayout>
    </div>
  );
};

export default Home;
