import { CalenderProvider } from '../context/CalenderContext'
import Loading from '@/components/shared/Loading'
import useApi from '@/hooks/useApi'
import { useEffect } from 'react'
import DashboardItems from '../components/DashboardItems'
import { useUser } from '@/hooks/useUser'

const dashboard = () => {
  // const { data: calendar } = useCalender()
  const { admin } = useUser()
  const { isLoading, data, get, error } = useApi()

  useEffect(() => {
    get('calenders?name=Julekalender')
  }, [get])

  return (
    <>
      <h1>Admin dashboard</h1>
      {
        //sjekker om bruker er admin før siden vises
        admin ? (
          isLoading ? (
            <Loading />
          ) : (
            <CalenderProvider value={data}>
              <DashboardItems />
            </CalenderProvider>
          )
        ) : (
          <p>404</p>
        )
      }
    </>
  )
}

export default dashboard
