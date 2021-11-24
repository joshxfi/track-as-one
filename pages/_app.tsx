import React from 'react';
import '../styles/global.css';
import '../styles/tailwind.css';
import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';

import LoaderHandler from '@/components/LoaderHandler';
import { AuthProvider } from '@/context/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AnimatePresence initial={false} exitBeforeEnter>
        <LoaderHandler>
          <Component {...pageProps} />
        </LoaderHandler>
      </AnimatePresence>
    </AuthProvider>
  );
}
export default MyApp;
