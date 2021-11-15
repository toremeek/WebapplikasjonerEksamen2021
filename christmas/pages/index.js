import Slot from '@/components/slot/Slot'
import { useCalendar } from '@/hooks/useCalendar'

export default function Home() {
  const { calendar } = useCalendar()
  const dateFormater = (datestring) => new Date(datestring).toLocaleDateString()

  // todo: få denne slik at den luken man trykker på blir en annen farge, ikke alle sammen
  // todo: får den fortsatt ikke til å fungere 🤦‍♂️
  const handleClick = (itemId) => {
    const updateSlot = calendar.slot.map(
      (hatch) => (
        //sjekker om itemId er den samme som hatch.id
        hatch.id === itemId ? { ...hatch, isOpen: true } : hatch,
        //prøver å vise slug'en for gitt luke, men ikke helt i mål
        (document.getElementById('show').innerHTML = hatch.slug)
      )
    )
    console.log(updateSlot)
  }

  return (
    <div>
      <h1>Julekalender eksamen 2021</h1>
      <section id="calendar">
        {calendar?.slot?.map((item, index) => (
          <Slot key={index} data={item} handler={handleClick} />
        ))}
      </section>
    </div>
  )
}
