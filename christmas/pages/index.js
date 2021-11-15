import { useCalendar } from '@/hooks/useCalendar'
import { useUser } from '@/hooks/useUser'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

export default function Home() {
  const { calendar } = useCalendar()
  const [open, setOpen] = useState(false)

  let colors = []

  const dateFormater = (datestring) => new Date(datestring).toLocaleDateString()
  //todo: få denne slik at den luken man trykker på blir en annen farge, ikke alle sammen
  const handleClick = (itemId) => {
    const slotId = calendar.slot.map(({ id }) => id)
    console.log(itemId)

    for (let i = 0; i < slotId.length; i++) {
      if (itemId == slotId[i]) {
        try {
          colors.push('textgreen')
          setOpen(true)
          console.log(open)
          console.log(slotId[i])
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  return (
    <>
      <div>
        <h1>Julekalender eksamen 2021</h1>
        <section id="calendar">
          {calendar?.slot?.map((item, index) => (
            <>
              <div key={item.id}>
                <button
                  className={colors}
                  key={index}
                  type="button"
                  onClick={() => handleClick(item.id)}
                >
                  {item.order} <br />
                  {dateFormater(item.openAt)}
                </button>
              </div>
            </>
          ))}
        </section>
      </div>
      <div></div>
    </>
  )
}
