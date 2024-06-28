import '../styles/global.css';

import type { AppProps } from 'next/app';

declare global {
  interface Window {
    _hsq: any;
  }
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default MyApp;
