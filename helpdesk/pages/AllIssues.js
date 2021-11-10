import SupportItem from '@/components/SupportItem'
import { filterIssues } from '@/features/filter/filter.controller'
import useGetData from '@/hooks/useGetData'
import { useState } from 'react'

const SupportMain = () => {
  const [filterData, setFilterData] = useState('')

  // sender med url til custom hook for å hente api-data. Hooket returnerer apiData, error & loading //
  const url = 'issues'
  const { apiData, error, loading } = useGetData({ url })

  const handleDepartmentFilter = (e) => {
    const filterDep = e.target.value
    setFilterData(filterDep)
  }
  //finner unike avdelinger fra apiData//
  const departments = [
    ...new Set(apiData?.data?.map((item) => item.department.name)),
  ]

  //finner unik hastegrad fra apiData //
  const severity = [...new Set(apiData?.data?.map((item) => item.severity))]

  return (
    <>
      {error ? <p>Noe gikk galt, {error}</p> : null}
      {loading ? (
        <p>Laster..</p>
      ) : (
        <section className="issues">
          <h2>Alle henvendelser</h2>

          <div>
            <p>Filtrer etter:</p>
            <select
              name="filter"
              value={filterData}
              onChange={handleDepartmentFilter}
            >
              <option value="">Alle avdelinger</option>
              {departments?.length > 0
                ? departments.map((deps) => (
                    <option key={deps} value={deps}>
                      {deps}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <ul>
            {apiData?.data.length > 0
              ? apiData?.data.map((items) => (
                  <SupportItem key={items.id} item={items} />
                ))
              : null}
          </ul>
        </section>
      )}
    </>
  )
}

export default SupportMain
