const IssueButton = (props) => {
  const { state, handler, trueText, falseText } = props
  return (
    <button
      role="button"
      onClick={handler || null}
      className={state ? 'active' : null}
    >
      {state ? trueText : falseText}
    </button>
  )
}

export default IssueButton
