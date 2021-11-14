import SupportItem from '@/components/SupportItem'
import Filter from '@/components/issue/Filter'
import { useEffect, useState } from 'react'
import useApi from '@/hooks/useApi'
import Loading from '@/components/shared/Loading'
import Alert from '@/components/shared/Alert'

const SupportMain = () => {
  const [filter, setFilter] = useState('')
  const { data, get, error, isLoading } = useApi()

  const getFilterIssues = async (filter) => {
    const { property, value } = filter

    if (!property || !value) getIssues()
    else await get(`${property}/${value}`)
  }

  const getIssues = async () => await get('')

  useEffect(() => {
    getFilterIssues(filter)
  }, [filter])

  useEffect(() => {
    getIssues()
  }, [])

  return (
    <section className="allissues wrapper">
      <Filter setFilter={setFilter} />
      <h1>Henvendelser</h1>
      <section className="issues-container">
        {error ? <Alert role="danger" text={error} /> : null}
        {isLoading ? (
          <Loading />
        ) : data?.length > 0 ? (
          data.map((issues) => <SupportItem key={issues.id} item={issues} />)
        ) : (
          <Alert role="info" text="Finner ingen resultater..." />
        )}
      </section>
    </section>
  )
}

export default SupportMain
