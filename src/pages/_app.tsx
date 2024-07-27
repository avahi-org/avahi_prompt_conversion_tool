/* eslint-disable import/no-extraneous-dependencies */
import '../styles/global.css';

import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

import { SidebarProvider } from '@/context';

declare global {
  interface Window {
    _hsq: any;
  }
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SidebarProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </SidebarProvider>
  );
};

export default MyApp;
