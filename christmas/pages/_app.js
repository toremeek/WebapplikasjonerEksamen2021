import '../styles/globals.scss'
import Layout from '@/components/Layout'
import { CalenderProvider } from '@/context/CalenderContext'

const ChristmasCalenderApp = ({ Component, pageProps }) => (
  <CalenderProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </CalenderProvider>
)

export default ChristmasCalenderApp
