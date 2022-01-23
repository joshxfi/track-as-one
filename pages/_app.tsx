import React from 'react';
import '../styles/global.css';
import '../styles/tailwind.css';
import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from '@/context/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AnimatePresence initial={false} exitBeforeEnter>
        <Component {...pageProps} />
      </AnimatePresence>
    </AuthProvider>
  );
}
export default MyApp;
