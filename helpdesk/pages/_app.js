import Layout from '@/components/Layout'
import { IssueProvider } from 'context/IssuesContext'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <IssueProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </IssueProvider>
  )
}

export default MyApp
