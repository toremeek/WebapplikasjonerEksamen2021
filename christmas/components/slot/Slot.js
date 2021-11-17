/* eslint-disable no-ternary */
import { useEffect } from 'react'

import { useCalenderDispatch } from '../../context/CalenderContext'
import useApi from '@/hooks/useApi'
import { daysUntil, isTimePassed } from '@/lib/dateHandler'

const Slot = (props) => {
  const dispatch = useCalenderDispatch()
  const { slot } = props
  const { id, isOpen, openAt, order, coupon } = slot

  const { data, openSlot } = useApi()

  useEffect(() => {
    if (data?.success) dispatch({ type: 'OPEN_SLOT', slot: data.slot })
  }, [data])

  // Slot click-handlers
  const handelOpenSlot = () => openSlot(id)
  const noAvailableAnimation = () => console.log('Animerer....')

  // Bestemmer hvordan slot skal virke - style, handler osv.
  const slotType = () => {
    // Hvis slot ikke er tilgjengelig - ikke åpen ennå
    if (!isTimePassed(openAt))
      return {
        handler: noAvailableAnimation,
        style: 'not-available',
        display: { main: order, alt: `Åpner om ${daysUntil(openAt)} dager` },
      }

    // Bruker har åpnet sloten
    if (isOpen)
      return {
        style: 'open',
        display: { main: coupon },
      }

    // Slot er tilgjengelig, og kan åpnes
    return {
      handler: handelOpenSlot,
      style: 'can-open',
      display: { main: order },
    }
  }

  const { handler, style, display } = slotType()

  return (
    <div className={`slot ${style}`} onClick={handler}>
      <h1>{display.main}</h1>
      {display.alt ? <p className="small">{display.alt}</p> : null}
    </div>
  )
}

export default Slot
