import { useCalender } from '../../context/CalenderContext'
import Slot from './Slot'

const SlotList = () => {
  const { state } = useCalender()

  return (
    <section className="calendar">
      {state?.slot?.map((obj, index) => (
        <Slot key={index} slot={obj} />
      ))}
    </section>
  )
}

export default SlotList
