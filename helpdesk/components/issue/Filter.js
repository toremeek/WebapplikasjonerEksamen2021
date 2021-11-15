import { filterProps } from '@/lib/filterProps'
import FilterSelect from './FilterSelect'
// import { useEffect, useState } from 'react'

const Filter = (props) => {
  const { setFilter } = props
  const { departments, severity } = filterProps

  // TODO: Enten tilbakestill til default value den av selectene
  // som ikke brukes, eller lag mulighet for å filterre på begge verdier

  return (
    <section className="filter">
      <FilterSelect selectFilter={setFilter} list={departments} />
      <FilterSelect selectFilter={setFilter} list={severity} />
    </section>
  )
}

export default Filter
