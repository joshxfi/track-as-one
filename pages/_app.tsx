import '../styles/tailwind.css'
import '../styles/global.css'
import type { AppProps } from 'next/app'
import { Layout } from '../src/components/Layout'
import { FirestoreProvider } from '../src/context/FirestoreContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <FirestoreProvider>
        <Component {...pageProps} />
      </FirestoreProvider>
    </Layout>
  )
}
export default MyApp
