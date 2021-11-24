/* eslint-disable no-ternary */
import Navigation from './Navigation'
import Alert from './shared/Alert'
import { useIssueContext } from '@/context/IssuesContext'

const Layout = ({ children }) => {
  const { state } = useIssueContext()

  return (
    <>
      <Navigation />
      <main className="layout">
        {state.error ? <Alert role="danger" text={state.error} /> : null}

        {children}
      </main>
    </>
  )
}

export default Layout
