import SupportItem from '@/components/SupportItem'
import useGetData from '@/hooks/useGetData'
import axios from 'axios'
import { useEffect, useState } from 'react'

const SupportMain = () => {
  const [filter, setFilter] = useState('')
  const [filterData, setFilterData] = useState()

  const url = 'issues'
  // sender med url til custom hook for å hente api-data. Hooket returnerer apiData, error & loading //
  const { apiData, error, loading } = useGetData({ url })

  //gjør nytt api-kall med verdien som er valgt i seleten//
  const handleDepartmentFilter = async (e) => {
    if (e === undefined || e.target.value === '') {
      setFilterData(apiData)
      setFilter('')
    } else {
      setFilter(e.target.value)
      const filterDep = e.target.value
      const response = await axios.get(
        `http://localhost:3000/api/issues/department/${filterDep}`
      )
      const newData = await response?.data

      setFilterData(newData)
    }
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
              value={filter}
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
            {filterData?.data?.length > 0
              ? filterData?.data?.map((items) => (
                  <SupportItem key={items.id} item={items} />
                ))
              : filterData?.data?.length === undefined
              ? apiData?.data?.map((item) => (
                  <SupportItem key={item.id} item={item} />
                ))
              : null}
          </ul>
          <ul></ul>
        </section>
      )}
    </>
  )
}

export default SupportMain
