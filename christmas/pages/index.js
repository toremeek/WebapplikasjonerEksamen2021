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
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCalendar()
  }, [])

  return (
    <>
      <div>
        <h1>Julekalender eksamen 2021</h1>
        <section id="calendar">
          {calendar?.slot?.map((item, index) => (
            <div className={colors} key={index}>
              {item.order}
            </div>
          ))}
        </section>
      </div>
      <div></div>
    </>
  )
}
