import PrimaryHeader from '@/components/header/PrimaryHeader';
import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react";
import {NextUIProvider} from "@nextui-org/react";
import { Toaster, toast } from 'react-hot-toast';
import NavBar from '@/components/header/NavBar';
import { appWithTranslation } from 'next-i18next'

function App({ Component, pageProps }: AppProps) {
  
  return(
    <SessionProvider session={pageProps.session}>
    <NextUIProvider>
  <ThemeProvider defaultTheme='system' attribute='class'>
    {/* <NavBar /> */}
   <Component {...pageProps} />
   <Toaster />
  </ThemeProvider>
  </NextUIProvider>

  </SessionProvider>

  );
}

export default appWithTranslation(App)
