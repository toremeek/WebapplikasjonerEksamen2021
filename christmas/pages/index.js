import { useCalendar } from '@/hooks/useCalendar'
import { useUser } from '@/hooks/useUser'
import React, { useEffect, useRef, useState } from 'react'

export default function Home() {
  const { calendar } = useCalendar()
  const [open, setOpen] = useState(false)
  console.log(calendar)
  let colors = []

  const dateFormater = (datestring) => new Date(datestring).toLocaleDateString()
  //todo: få denne slik at den luken man trykker på blir en annen farge, ikke alle sammen
  const handleClick = (itemId) => {
    console.log(itemId)
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
