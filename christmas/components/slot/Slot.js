/* eslint-disable no-ternary */
import useApi from '@/hooks/useApi'
import { useUser } from '@/hooks/useUser'
import { daysUntil, isTimePassed } from '@/lib/dateHandler'

const Slot = (props) => {
  const { slot } = props
  const { id, isOpen, openAt, order, coupon } = slot
  const { user } = useUser()

  const { openSlot } = useApi()

  // Slot click-handlers
  // TODO: Legg til animasjon når luke åpnes
  const handelOpenSlot = () => openSlot(id)
  // TODO: Legg til animasjon når luke ikke er tilgjengelig
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

    if (!user.username || !user.id)
      return {
        handler: noAvailableAnimation,
        style: 'can-open',
        display: { main: order },
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
