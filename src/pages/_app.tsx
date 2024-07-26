import '../styles/global.css';

import type { AppProps } from 'next/app';

import { SidebarProvider } from '@/context';

declare global {
  interface Window {
    _hsq: any;
  }
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SidebarProvider>
      <Component {...pageProps} />
    </SidebarProvider>
  );
};

export default MyApp;
