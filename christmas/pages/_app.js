import '../styles/globals.scss'
import Footer from '@/components/Footer'
import Layout from '@/components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Footer />
    </div>
  )
}

export default MyApp
