import { useCalendar } from '@/hooks/useCalendar'
import { isStyledComponent } from 'styled-components'
import {
  msToDays,
  formatDate,
  daysUntil,
  isTimePassed,
} from '@/lib/dateHandler'
export default function Home() {
  const { calendar } = useCalendar()
  const dateFormater = (datestring) => new Date(datestring).toLocaleDateString()

  //todo: få denne slik at den luken man trykker på blir en annen farge, ikke alle sammen
  //todo: får den fortsatt ikke til å fungere 🤦‍♂️
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
    <>
      <div>
        <h1>Julekalender eksamen 2021</h1>
        <section id="calendar">
          {calendar?.slot?.map((item, index) => (
            <>
              <div
                id="show"
                key={item.id}
                className={item.isOpen ? 'green' : 'normal'}
                key={index}
              >
                {item.order}
                {isTimePassed(item.openAt) ? (
                  <button onClick={() => handleClick(item.id)}>Åpne nå</button>
                ) : (
                  <p>{`Kan åpnes om: ${daysUntil(item.openAt)} dager`}</p>
                )}
              </div>
            </>
          ))}
        </section>
      </div>
    </>
  )
}
