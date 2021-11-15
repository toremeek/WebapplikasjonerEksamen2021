/* eslint-disable no-ternary */
import { daysUntil, isTimePassed } from '@/lib/dateHandler'

const Slot = (props) => {
  const { data, handler } = props
  const { id, isOpen, openAt, order } = data

  const handelOpenSlot = () => handler(id)

  return (
    <div id="show" className={isOpen ? 'green' : 'normal'}>
      {order}
      {isTimePassed(openAt) ? (
        <button onClick={handelOpenSlot}>Åpne nå</button>
      ) : (
        <p>{`Kan åpnes om: ${daysUntil(openAt)} dager`}</p>
      )}
    </div>
  )
}

export default Slot
