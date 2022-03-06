import React from 'react';

import '../styles/global.css';
import '../styles/tailwind.css';
import 'nprogress/nprogress.css';
import Router from 'next/router';
import NProgress from 'nprogress';
import { DefaultSeo } from 'next-seo';
import { Toaster } from 'react-hot-toast';
import { AppPropsWithLayout } from '@/types/page';
import { AuthProvider } from '@/contexts/AuthContext';

import SEO from '../next-seo-config';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AuthProvider>
      <DefaultSeo {...SEO} />
      <Toaster position='bottom-center' />
      {getLayout(<Component {...pageProps} />)}
    </AuthProvider>
  );
}
export default MyApp;
