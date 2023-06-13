import { AppProps } from 'next/app';
import '../styles/globals.css'
import {useRouter} from 'next/router';
import { FC, memo, useCallback, useEffect, useState} from 'react';

const MyApp = memo(({Component, pageProps}: AppProps) => {
  const router = useRouter();
  const [relayEnvironment] = useState(() =>undefined
  );

  return <Component {...pageProps} key={router.asPath} />;
})

export default MyApp
