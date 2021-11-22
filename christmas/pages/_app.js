import '../styles/globals.scss'
import Footer from '@/components/Footer'
import Layout from '@/components/Layout'
import { CalenderProvider } from '@/context/CalenderContext'

const ChristmasCalenderApp = ({ Component, pageProps }) => (
  <CalenderProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    <Footer />
  </CalenderProvider>
)

export default ChristmasCalenderApp
