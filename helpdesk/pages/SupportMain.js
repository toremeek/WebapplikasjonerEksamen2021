import GetComments from '@/components/GetComments'
import SupportItem from '@/components/SupportItem'
import useGetData from '@/hooks/useGetData'
import { useState } from 'react'

const SupportMain = () => {
  // const [filterData, setFilterData] = useState('')

  //sender med url til custom hook for å hente api-data. Hooket returnerer apiData, error & loading //
  const url = 'issues'
  const { apiData, error, loading } = useGetData({ url })

  // const handleDepartmentFilter = (value) => {
  //   setFilterData(value.target.value)
  // }

  return (
    <>
      {error ? <p>Noe gikk galt, {error}</p> : null}
      {loading ? (
        <p>Laster..</p>
      ) : (
        <section className="issues">
          <h2>Alle henvendelser</h2>
          {/* <div>
            <p>Filtrer etter:</p>
            <select
              name="filter"
              value={data.department}
              onChange={handleDepartmentFilter}
            >
              <option value="">Alle avdelinger</option>
              <option value="it">IT</option>
              <option value="salg">Salg</option>
              <option value="design">Design</option>
            </select>
          </div> */}
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
