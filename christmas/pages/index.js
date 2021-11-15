/* eslint-disable no-ternary */
import { useEffect } from 'react'

import { CalenderProvider } from '../context/CalenderContext'
import Loading from '@/components/shared/Loading'
import SlotList from '@/components/slot/SlotList'
import useApi from '@/hooks/useApi'

// import { useCalendar } from '@/hooks/useCalendar'

export default function Home() {
  // const { data: calendar } = useCalender()

  const { isLoading, data, get, error } = useApi()

  useEffect(() => {
    get('calenders?name=Julekalender')
  }, [get])

  // todo: få denne slik at den luken man trykker på blir en annen farge, ikke alle sammen
  // todo: får den fortsatt ikke til å fungere 🤦‍♂️
  // const handleClick = (itemId) => {
  //   const updateSlot = calendar.slot.map(
  //     (hatch) => (
  //       //sjekker om itemId er den samme som hatch.id
  //       hatch.id === itemId ? { ...hatch, isOpen: true } : hatch,
  //       //prøver å vise slug'en for gitt luke, men ikke helt i mål
  //       (document.getElementById('show').innerHTML = hatch.slug)
  //     )
  //   )
  //   console.log(updateSlot)
  // }

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
