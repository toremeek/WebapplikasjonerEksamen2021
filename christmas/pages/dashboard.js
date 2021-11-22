/* eslint-disable no-ternary */
import { useEffect } from 'react'

import DashboardList from '@/components/dashboard/DashboardList'
import Alert from '@/components/shared/Alert'
import Loading from '@/components/shared/Loading'
import useApi from '@/hooks/useApi'
import { useUser } from '@/hooks/useUser'

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
      {isLoading ? <Loading /> : <DashboardList />}
    </section>
  )
}

export default Dashboard
