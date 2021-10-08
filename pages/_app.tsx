import '../styles/tailwind.css'
import '../styles/global.css'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'

import { FirestoreProvider } from '@/context/FirestoreContext'
import LoaderHandler from '@/components/LoaderHandler'
import { AuthProvider } from '@/context/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <FirestoreProvider>
        <AnimatePresence initial={false} exitBeforeEnter>
          <LoaderHandler>
            <Component {...pageProps} />
          </LoaderHandler>
        </AnimatePresence>
      </FirestoreProvider>
    </AuthProvider>
  )
}
export default MyApp
