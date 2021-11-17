import SupportItem from '@/components/SupportItem'
import Filter from '@/components/issue/Filter'
import { useEffect, useState } from 'react'
import useApi from '@/hooks/useApi'
import Loading from '@/components/shared/Loading'
import Alert from '@/components/shared/Alert'
import { useIssueContext } from 'context/IssuesContext'

const SupportMain = () => {
  const { data, get, error, isLoading } = useApi()
  const { state, dispatch } = useIssueContext()
  const { issues, isGlobalLoading } = state

  useEffect(() => {
    dispatch({ type: 'SET_ISSUES', issues: data })
  }, [data])

  useEffect(() => {
    const getIssues = async () => {
      await get('')
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
          issues.map((issues) => <SupportItem key={issues.id} item={issues} />)
        ) : (
          <Alert role="info" text="Finner ingen resultater..." />
        )}
      </section>
    </section>
  )
}

export default SupportMain
