import { useState } from 'react'

const Alert = (props) => {
  const [visible, setVisible] = useState(true)
  const { role, text } = props

  // TODO: Fikse styling på lukking av alert! Knapp helt til høyre osv osv.. :)
  if (!visible) return null
  return (
    <div className={`alert ${role}`}>
      {text}{' '}
      <button type="button" onClick={() => setVisible(false)}>
        Close
      </button>
    </div>
  )
}

export default Alert
