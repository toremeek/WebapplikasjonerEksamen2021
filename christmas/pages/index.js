/* eslint-disable no-ternary */
import { useEffect } from 'react'

import Alert from '@/components/shared/Alert'
import Loading from '@/components/shared/Loading'
import SlotList from '@/components/slot/SlotList'
import { useCalenderContext } from '@/context/CalenderContext'
import useApi from '@/hooks/useApi'
import { useUser } from '@/hooks/useUser'

export default function Home() {
  const { isLoading, get, error } = useApi()
  const { dispatch } = useCalenderContext()
  const {
    user: { id, username },
  } = useUser()

  // Laster kalender fra databasen
  useEffect(() => {
    const getCalender = async () => {
      const response = await get('calenders?name=Julekalender')

      if (!error) dispatch({ type: 'SET_CALENDER', calender: response })
    }

    getCalender()
  }, [])

  if (error)
    return <Alert role="danger" text={`⚠️ En feil har oppstått: ${error}`} />

  return (
    <>
      {!id || !username ? (
        <Alert role="info" text="Vennligst logg inn for å åpne luker!" />
      ) : null}
      {isLoading ? <Loading /> : <SlotList />}
    </>
  )
}
