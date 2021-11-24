import { useState, useEffect } from 'react'

import FilterSelect from './FilterSelect'
import { useIssueContext } from '@/context/IssuesContext'
import useApi from '@/hooks/useApi'

const Filter = () => {
  const { getFilterIssues, getIssues, error, isLoading } = useApi()
  const { state, dispatch } = useIssueContext()
  const [filter, setFilter] = useState('')
  const { departments, severity } = state?.filter

  useEffect(() => {
    if (!filter.property || !filter.value) getIssues()
    else getFilterIssues(filter)
  }, [filter])

  // Oppdaterer Global Loading / ERROR
  useEffect(() => {
    dispatch({ type: 'ISLOADING', isLoading })
  }, [isLoading])

  useEffect(() => {
    dispatch({ type: 'SET_ERROR', error })
  }, [error])

  // Tilbakestiller filter til vis alle - retter ikke på hva som er valg i selectfelt.
  const displayAll = () => setFilter('')

  return (
    <section className="filter">
      <button role="button" onClick={displayAll}>
        Vis alle
      </button>
      <FilterSelect selectFilter={setFilter} list={departments} />
      <FilterSelect selectFilter={setFilter} list={severity} />
    </section>
  )
}

export default Filter
