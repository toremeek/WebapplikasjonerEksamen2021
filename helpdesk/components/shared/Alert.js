// TODO: Skrive om slik at den bruker children istede for text?
const Alert = (props) => {
  const { role, text } = props

  return <div className={`alert ${role}`}>{text}</div>
}

export default Alert
