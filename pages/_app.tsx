import React from 'react';
import '../styles/global.css';
import '../styles/tailwind.css';
import 'nprogress/nprogress.css';
import Router from 'next/router';
import NProgress from 'nprogress';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from '@/context/AuthContext';

import SEO from '../next-seo-config';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <DefaultSeo {...SEO} />
      <Toaster />
      <AnimatePresence initial={false} exitBeforeEnter>
        <Component {...pageProps} />
      </AnimatePresence>
    </AuthProvider>
  );
}
export default MyApp;
