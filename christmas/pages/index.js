import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const initialCalendar = Array.from({ length: 24 }, (_, i) => i + 1)

export default function Home() {
  const [calendarSquare, setCalendarSquare] = useState(initialCalendar)
  const [calendar, setCalendar] = useState([])

  //prøver å hente ut alle slots fra caledars.js
  const getCalendar = async () => {
    try {
      const response = await axios('/api/calenders')

      if (response?.data?.success) {
        setCalendar(response.data.slots)
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log(calendar)
  useEffect(() => {
    getCalendar()
  }, [])

  return (
    <>
      <div>
        <h1>Julekalender eksamen 2021</h1>
        <section id="calendar">
          {calendarSquare.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </section>
      </div>
      <div></div>
    </>
  )
}
