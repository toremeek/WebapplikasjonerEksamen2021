/* eslint-disable no-ternary */
import { useEffect } from 'react'

import Alert from '@/components/shared/Alert'
import Loading from '@/components/shared/Loading'
import SlotList from '@/components/slot/SlotList'
import useApi from '@/hooks/useApi'
import { useUser } from '@/hooks/useUser'

export default function Home() {
  const { isLoading, getCalender, error } = useApi()
  const {
    user: { id, username },
  } = useUser()

  // Laster kalender fra databasen
  useEffect(() => {
    getCalender('Julekalender')
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
