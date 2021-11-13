import { useCalendar } from '@/hooks/useCalendar'
import { useUser } from '@/hooks/useUser'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

export default function Home() {
  const { calendar } = useCalendar()
  const [open, setOpen] = useState(false)

  let colors = []

  //todo: få denne slik at den luken man trykker på blir en annen farge, ikke alle sammen
  const handleClick = (id) => {
    const test = calendar.slot.map(({ id }) => id)
    console.log(id)

    for (let i = 0; i < test.length; i++) {
      if (id == test[i]) {
        try {
          colors.push('textgreen')
          setOpen(true)
          console.log(open)
          console.log(test[i])
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
                  {item.openAt}
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
