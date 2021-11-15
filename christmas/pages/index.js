<<<<<<< HEAD
import { useCalendar } from '@/hooks/useCalendar'
import { useUser } from '@/hooks/useUser'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

export default function Home() {
  const { calendar } = useCalendar()
  const [open, setOpen] = useState(false)

  let colors = []

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
=======
import React, { useEffect, useRef, useState } from 'react'

import axios from 'axios'

const initialCalendar = Array.from({ length: 24 }, (_, i) => i + 1)

export default function Home() {
  const [calendarSquare, setCalendarSquare] = useState(initialCalendar)
  const [open, setOpen] = useState(0)
  const [calendar, setCalendar] = useState({})

  const day = new Date()
  const today = day.getDate()

  // Todo: lage dynamisk className som skal settes på en gitt div
  let colors = []

  const getCalendar = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/calenders?name=Julekalender'
      )

      const {
        data: { success, data },
      } = response

      if (success) {
        console.log(data)
        setCalendar(data)
>>>>>>> aleks_oppgave_1_helpdesk
      }
    }
  }
<<<<<<< HEAD
=======

  useEffect(() => {
    getCalendar()
  }, [])
>>>>>>> aleks_oppgave_1_helpdesk

  return (
    <>
      <div>
        <h1>Julekalender eksamen 2021</h1>
        <section id="calendar">
          {calendar?.slot?.map((item, index) => (
<<<<<<< HEAD
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
=======
            <div className={colors} key={index}>
              {item.order}
            </div>
>>>>>>> aleks_oppgave_1_helpdesk
          ))}
        </section>
      </div>
      <div></div>
    </>
  )
}
