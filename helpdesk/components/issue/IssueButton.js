const IssueButton = (props) => {
  const { state, handler, trueText, falseText, isResolved } = props

  return (
    <button
      role="button"
      onClick={handler || null}
      className={isResolved ? 'resolved' : state ? 'active' : null}
      disabled={isResolved}
    >
      {state ? trueText : falseText}
    </button>
  )
}

export default IssueButton
