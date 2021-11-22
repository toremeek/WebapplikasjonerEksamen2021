/* eslint-disable no-ternary */
import { useEffect } from 'react'

import DashboardList from '@/components/dashboard/DashboardList'
import Alert from '@/components/shared/Alert'
import Loading from '@/components/shared/Loading'
import useApi from '@/hooks/useApi'
import { useUser } from '@/hooks/useUser'
import useToggle from '@/hooks/useToggle'
import Superbonus from '@/components/dashboard/Superbonus'

const Dashboard = () => {
  const { admin } = useUser()
  const { isLoading, getDashboardCalender } = useApi()
  const displayModal = useToggle(false)

  useEffect(() => {
    getDashboardCalender('Julekalender')
  }, [])

  if (!admin) return <Alert role="warning" text="Her skal ikke du være!" />

  return (
    <>
      {displayModal ? <Superbonus toggle={displayModal} data={winner} /> : null}
      <h1>Admin dashboard</h1>
      {isLoading ? <Loading /> : <DashboardList />}
    </>
  )
}

export default Dashboard
