import SupportItem from '@/components/SupportItem'
import useGetData from '@/hooks/useGetData'
import axios from 'axios'
import { useState } from 'react'

const SupportMain = () => {
  const [filter, setFilter] = useState('fds')

  //TODO: url kan endre til variabel om man ikke gjør nytt api-kall
  const [url, setUrl] = useState('issues')
  // sender med url til custom hook for å hente api-data. Hooket returnerer apiData, error & loading //
  const { apiData, error, loading } = useGetData({ url })

  //TODO: ikke i mål med filtrering. Gjør API-kall, men får ingenting tilbake //
  const handleDepartmentFilter = async (e) => {
    const filterDep = e.target.value.toLowerCase()
    console.log(filterDep)
    setFilter(filterDep)
    // const response = await axios.get(
    //   `http://localhost:3000/api/issues/department/${filterDep}`
    // )
    // const filtereddata = await response?.data
    // console.log('respFilt', filtereddata)
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
            {apiData?.data?.length > 0
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
