/* eslint-disable no-ternary */
import { useEffect, useState } from 'react'

import DashboardList from '@/components/dashboard/DashboardList'
import Superbonus from '@/components/dashboard/Superbonus'
import Alert from '@/components/shared/Alert'
import Loading from '@/components/shared/Loading'
import useApi from '@/hooks/useApi'
import useToggle from '@/hooks/useToggle'
import { useUser } from '@/hooks/useUser'

const Dashboard = () => {
  const { admin } = useUser()
  const { isLoading, getDashboardCalender } = useApi()
  const [modal, displayModal] = useToggle(false)
  const [winner, setWinner] = useState('')

  useEffect(() => {
    if (admin) getDashboardCalender('Julekalender')
  }, [])

  if (!admin) return <Alert role="warning" text="Her skal ikke du være!" />

  return (
    <>
      {modal ? <Superbonus toggle={displayModal} data={winner} /> : null}
      <h1>Admin dashboard</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <DashboardList modalHandler={{ setWinner, displayModal }} />
      )}
    </>
  )
}

export default Dashboard
