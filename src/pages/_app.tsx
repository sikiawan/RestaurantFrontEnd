import PrimaryHeader from '@/components/header/PrimaryHeader';
import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react";

function App({ Component, pageProps }: AppProps) {
  
  return(
    <SessionProvider session={pageProps.session}>

  <ThemeProvider defaultTheme='system' attribute='class'>
    <PrimaryHeader />
   <Component {...pageProps} />

  </ThemeProvider>
  </SessionProvider>

  );
}

export default  App;
