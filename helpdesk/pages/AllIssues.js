import SupportItem from '@/components/SupportItem'
import Filter from '@/components/issue/Filter'
import { useEffect, useState } from 'react'
import useApi from '@/hooks/useApi'

const SupportMain = () => {
  const [filter, setFilter] = useState('')
  const { data, get, error, isLoading } = useApi()

  const getFilterIssues = async (filter) => {
    console.log(filter)
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
    <section className="allissues">
      <Filter setFilter={setFilter} />
      <h1>Henvendelser</h1>
      <section className="issues-container">
        {error ? <p>Noe gikk galt, {error}</p> : null}
        {isLoading ? (
          <p>Laster..</p>
        ) : data?.length > 0 ? (
          data.map((issues) => <SupportItem key={issues.id} item={issues} />)
        ) : (
          <p>finner ingen resultater</p>
        )}
      </section>
    </section>
  )
}

export default SupportMain
