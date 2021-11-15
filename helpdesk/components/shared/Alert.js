const Alert = (props) => {
  const { role, text } = props

  return <div className={`alert ${role}`}>{text}</div>
}

export default Alert
