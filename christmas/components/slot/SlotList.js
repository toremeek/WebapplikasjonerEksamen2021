import Alert from '../shared/Alert'
import Slot from './Slot'
import { useCalenderContext } from '@/context/CalenderContext'

const SlotList = () => {
  const {
    state: { slot },
  } = useCalenderContext()

  // Hvis kalender har blitt lastet men vi mangler luker!
  if (slot?.length <= 0)
    return (
      <Alert
        role="danger"
        text={'⚠️ Her har det skjedd en feil! Finner ingen luker!'}
      />
    )

  // Viser luker
  return (
    <section className="calendar">
      {slot?.map((obj, index) => (
        <Slot key={index} slot={obj} />
      ))}
    </section>
  )
}

export default SlotList
