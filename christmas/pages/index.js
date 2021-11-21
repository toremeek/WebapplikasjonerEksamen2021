/* eslint-disable no-ternary */
import { useEffect } from 'react'

import { CalenderProvider } from '../context/CalenderContext'
import Alert from '@/components/shared/Alert'
import Loading from '@/components/shared/Loading'
import SlotList from '@/components/slot/SlotList'
import useApi from '@/hooks/useApi'

export default function Home() {
  const { isLoading, data, get, error } = useApi()

  useEffect(() => {
    get('calenders?name=Julekalender')
  }, [get])

  if (error)
    return <Alert role="warnign" text={`⚠️ En feil har oppstått: ${error}`} />

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
