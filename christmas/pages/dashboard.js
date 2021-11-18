import DashboardItem from '@/components/DashboardItems'
import { CalenderProvider } from '../context/CalenderContext'
import Loading from '@/components/shared/Loading'
import useApi from '@/hooks/useApi'
import { useEffect } from 'react'
import DashboardItems from '@/components/DashboardItems'

const dashboard = () => {
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
          <DashboardItems />
        </CalenderProvider>
      )}
    </>
  )
}

export default dashboard
