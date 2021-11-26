/* eslint-disable no-ternary */
import { useEffect, useState } from 'react'

import { useCalenderContext } from '@/context/CalenderContext'
import useApi from '@/hooks/useApi'
import { useUser } from '@/hooks/useUser'
import { daysUntil, isTimePassed } from '@/lib/dateHandler'

const Slot = (props) => {
  const { slot } = props
  const { id, isOpen, openAt, order, coupon } = slot
  const { user } = useUser()
  const { put, error } = useApi()
  const { dispatch } = useCalenderContext()
  const [animation, setAnimation] = useState('')

  const openSlot = async () => {
    const response = await put(`slots/${id}`)

    if (!error) dispatch({ type: 'OPEN_SLOT', ...response })
  }

  // Cleanup - kom warning om mermory leak
  useEffect(() => {
    return () => {
      setAnimation('')
    }
  }, [])

  // Bestemmer hvordan slot skal virke - style, handler osv.
  const slotType = () => {
    // Hvis bruker ikke er logget inn - vis julekalender som ikke kan åpnes
    if (!user.username || !user.id)
      return {
        handler: () => setAnimation('shake'),
        stopAnimation: () => setAnimation(''),
        style: 'can-open',
        display: { main: order },
      }

    // Hvis slot ikke er tilgjengelig - ikke åpen ennå
    if (!isTimePassed(openAt))
      return {
        handler: () => setAnimation('shake'),
        stopAnimation: () => setAnimation(''),
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
      handler: () => setAnimation('opening'),
      stopAnimation: () => openSlot(id),
      style: 'can-open',
      display: { main: order },
    }
  }

  const { handler, stopAnimation, style, display } = slotType()

  return (
    <div
      className={`slot ${style} ${animation}`}
      onAnimationEnd={stopAnimation}
      onClick={handler}
    >
      <h1>{display.main}</h1>
      {display.alt ? <p className="small">{display.alt}</p> : null}
    </div>
  )
}

export default Slot
