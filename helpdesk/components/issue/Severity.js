// TODO: Exportere denne
const priority = {
  1: { color: 'green', text: 'Lav' },
  2: { color: 'yellow', text: 'Medium' },
  3: { color: 'red', text: 'Høy' },
}

const Severity = ({ severity }) => {
  const { color, text } = priority[severity] || {
    color: 'gray',
    text: 'dont know',
  }
  return (
    <>
      <span className={`dot ${color}`}></span> {text}
    </>
  )
}

export default Severity
