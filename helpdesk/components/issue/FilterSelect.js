const FilterSelect = (props) => {
  const { selectFilter, list } = props
  const { type, defaultText } = list

  const handleFilterSelect = (e) => {
    selectFilter({ property: type, value: e.target.value })
  }

  return (
    <select name="filter" onChange={handleFilterSelect}>
      <option value="">{defaultText}</option>
      {list.getValues().map((item, index) => (
        <option key={index} value={item.value}>
          {item.text}
        </option>
      ))}
    </select>
  )
}

export default FilterSelect
