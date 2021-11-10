import SupportItem from '@/components/SupportItem'
import useGetData from '@/hooks/useGetData'
import { useState } from 'react'

const SupportMain = () => {
  const [filterData, setFilterData] = useState('')

  // sender med url til custom hook for å hente api-data. Hooket returnerer apiData, error & loading //
  const url = 'issues'
  const { apiData, error, loading } = useGetData({ url })

  const handleDepartmentFilter = (e) => {
    setFilterData(e.target.value)
  }

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
              <option value="ckvqmujnx0021eovhtbsz3elo">IT</option>
              <option value="ckvqmujnx0025eovhtgero4ce">Salg</option>
              <option value="ckvqmujnx0022eovhl41yg01u">Design</option>
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
