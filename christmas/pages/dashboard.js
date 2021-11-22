/* eslint-disable no-ternary */
import { useEffect } from 'react'

import DashboardList from '@/components/dashboard/DashboardList'
import Alert from '@/components/shared/Alert'
import Loading from '@/components/shared/Loading'
import useApi from '@/hooks/useApi'
import { useUser } from '@/hooks/useUser'
import Alert from '../components/shared/Alert'

const Dashboard = () => {
  const { admin } = useUser()
  const { isLoading, getDashboardCalender } = useApi()

  useEffect(() => {
    getDashboardCalender()
  }, [])

  if (!admin) return <Alert role="warning" text="Her skal ikke du være!" />

  return (
    <section>
      <h1>Admin dashboard</h1>
<<<<<<< HEAD
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
          <Alert text={'Du har ikke tilgang til dette området'} />
        )
      }
    </>
=======
      {isLoading ? <Loading /> : <DashboardList />}
    </section>
>>>>>>> aleks_oppgave_2_christmas
  )
}

export default Dashboard
