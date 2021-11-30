import { useState, useEffect } from 'react'

import FilterSelect from './FilterSelect'
import { useIssueContext } from '@/context/IssuesContext'
import useApi from '@/hooks/useApi'

const Filter = () => {
  const { get, error, isLoading } = useApi()
  const { state, dispatch } = useIssueContext()
  const [filter, setFilter] = useState('')
  const { departments, severity } = state?.filter

  // Henter alle henvendelser hvis filter props ikke er valgt
  const getAllIssues = async () => {
    const result = await get()

    if (!error) dispatch({ type: 'SET_ISSUES', issues: result })
  }

  // Henter filtrerte henvendesler fra API
  const getFilterIssues = async (filterBy) => {
    const { property, value } = filterBy
    const result = await get(`${property}/${value}`)

    if (!error) dispatch({ type: 'SET_ISSUES', issues: result })
  }

  useEffect(() => {
    if (!filter.property || !filter.value) getAllIssues()
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
