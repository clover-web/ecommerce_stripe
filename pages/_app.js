import React from 'react';
import { Toaster } from 'react-hot-toast';

import { Layout } from '../components';

import '../styles/globals.css'
import { StateContext } from '../context/StateContext';


/*
  //returns component that your currently on through children prop
      <Component {...pageProps} />
*/

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp;
