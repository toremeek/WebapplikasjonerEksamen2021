const ValidationAlert = (props) => {
  const { errors } = props

  return (
    <div className="alert danger">
      {errors.map((error, i) => (
        <p key={i}>❌ {error}</p>
      ))}
    </div>
  )
}

export default ValidationAlert
