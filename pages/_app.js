import '../styles/globals.css';
import Head from 'next/head';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';


import user from "../reducers/user";
import tweets from "../reducers/tweets";
import hashtags from "../reducers/hashtags";

const store = configureStore({
  reducer: { user, tweets, hashtags },
});

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>HACKATWEET</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
