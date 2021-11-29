/* eslint-disable no-nested-ternary */
/* eslint-disable no-ternary */
import { useEffect } from 'react'

import Filter from '@/components/issue/Filter'
import Alert from '@/components/shared/Alert'
import Loading from '@/components/shared/Loading'
import SupportItem from '@/components/SupportItem'
import { useIssueContext } from '@/context/IssuesContext'
import useApi from '@/hooks/useApi'

const SupportMain = () => {
  const { error, isLoading, get } = useApi()
  const { dispatch, state } = useIssueContext()
  const { issues, isGlobalLoading } = state

  useEffect(() => {
    const getIssues = async () => {
      const result = await get()

      if (!error) dispatch({ type: 'SET_ISSUES', issues: result })
    }

    getIssues()
  }, [])

  return (
    <section className="allissues wrapper">
      <Filter />
      <h1>Henvendelser</h1>
      <section className="issues-container">
        {error ? <Alert role="danger" text={error} /> : null}
        {isLoading || isGlobalLoading ? (
          <Loading />
        ) : issues?.length > 0 ? (
          issues.map((issue) => <SupportItem key={issue.id} item={issue} />)
        ) : (
          <Alert role="info" text="Finner ingen resultater..." />
        )}
      </section>
    </section>
  )
}

export default SupportMain
