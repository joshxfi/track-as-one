import '../styles/tailwind.css'
import '../styles/global.css'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'

import { FirestoreProvider } from '@/context/FirestoreContext'
import { Layout } from '@/components/Layout'
import LoaderHandler from '@/components/LoaderHandler'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <FirestoreProvider>
        <AnimatePresence initial={false} exitBeforeEnter>
          <LoaderHandler>
            <Component {...pageProps} />
          </LoaderHandler>
        </AnimatePresence>
      </FirestoreProvider>
    </Layout>
  )
}
export default MyApp
