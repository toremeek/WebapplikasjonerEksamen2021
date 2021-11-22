/* eslint-disable no-ternary */
import { useEffect } from 'react'

import { CalenderProvider } from '../context/CalenderContext'
import Loading from '@/components/shared/Loading'
import SlotList from '../components/slot/SlotList'
import useApi from '@/hooks/useApi'

// import { useCalendar } from '@/hooks/useCalendar'

export default function Home() {
  // const { data: calendar } = useCalender()

  const { isLoading, data, get, error } = useApi()

  useEffect(() => {
    get('calenders?name=Julekalender')
  }, [get])

  return (
    <>
      <h1>Julekalender eksamen 2021</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <CalenderProvider value={data}>
          <SlotList />
        </CalenderProvider>
      )}
    </>
  )
}
