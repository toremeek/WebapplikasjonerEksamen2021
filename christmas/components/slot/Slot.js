/* eslint-disable no-ternary */
import { useEffect } from 'react'

import { useCalenderDispatch } from '../../context/CalenderContext'
import useApi from '@/hooks/useApi'
import { daysUntil, isTimePassed } from '@/lib/dateHandler'

const Slot = (props) => {
  const dispatch = useCalenderDispatch()
  const { slot } = props
  const { id, isOpen, openAt, order } = slot

  const { data, error, openSlot } = useApi()

  const handelOpenSlot = () => openSlot(id)

  useEffect(() => {
    if (data?.success) dispatch({ type: 'OPEN_SLOT', id })
  }, [data])

  const buttonStyle = () => {
    if (!isTimePassed(openAt)) return 'not-available'

    return isOpen ? 'open' : 'can-open'
  }

  // TODO: Funksjon som definerer fargen på slot:
  // Åpnet: grønn, Ikke åpnet, men tilgjengelig: Hvit, Ikke tilgjengelig: dusgrå

  return (
    <div className={`slot ${buttonStyle()}`} onClick={handelOpenSlot}>
      <h1>{order}</h1>
      {isTimePassed(openAt) ? (
        <button onClick={handelOpenSlot}>Åpne nå</button>
      ) : (
        <p className="small">{`Åpner om ${daysUntil(openAt)} dager`}</p>
      )}
    </div>
  )
}

export default Slot
