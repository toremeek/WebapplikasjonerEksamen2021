import SupportItem from '@/components/SupportItem'
import { useState } from 'react'
import styled from 'styled-components'

const SupportMain = () => {
  const data = [
    {
      id: 1,
      title: 'Title one',
      creator: 'Marius Wallin',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non neque diam. Nam placerat nunc id vulputate pretium. In ac metus sit amet augue suscipit ornare.',
      department: 'salg',
      severity: 'low',
      isResolved: false,
      createdAt: new Date(2021, 11, 22).toLocaleDateString(),
      comments: ['Dette var ikke bra'],
    },
    {
      id: 2,
      title: 'Title two',
      creator: 'Simen Simensen',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non neque diam. Nam placerat nunc id vulputate pretium. In ac metus sit amet augue suscipit ornare.',
      department: 'it',
      severity: 'medium',
      isResolved: false,
      createdAt: new Date(2021, 11, 6).toLocaleDateString(),
      comments: ['Dette var flotte saker'],
    },
    {
      id: 3,
      title: 'Title three',
      creator: 'Trude Trudesen',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non neque diam. Nam placerat nunc id vulputate pretium. In ac metus sit amet augue suscipit ornare.',
      department: 'design',
      severity: 'high',
      isResolved: false,
      createdAt: new Date(2021, 10, 12).toLocaleDateString(),
      comments: ['Håpløst, hun har ikke peiling'],
    },
  ]
  const [filterData, setFilterData] = useState('')

  const handleDepartmentFilter = (value) => {
    setFilterData(value.target.value)
  }

  return (
    <section className="issues">
      <h2>Alle henvendelser</h2>
      <div>
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
      </div>
      <ul>
        {filterData?.length > 0
          ? data
              ?.filter((data) => data.department == filterData)
              .map((filteredData) => (
                <SupportItem key={filteredData.id} item={filteredData} />
              ))
          : data?.map((issue) => <SupportItem key={issue.id} item={issue} />)}
      </ul>
    </section>
  )
}

export default SupportMain
