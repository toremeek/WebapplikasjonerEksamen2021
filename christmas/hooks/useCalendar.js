import { useEffect, useState } from 'react'

import axios from 'axios'

export const useCalendar = () => {
  const [calendar, setCalendar] = useState({})

  useEffect(() => {
    const getCalendar = async () => {
      try {
        const response = await axios.get('/api/calenders?name=Julekalender')
        const {
          data: { success, data },
        } = response

        if (success) {
          setCalendar(data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getCalendar()
  }, [])

  return { calendar, setCalendar }
}
