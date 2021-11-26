/* eslint-disable no-ternary */
import { useEffect, useState } from 'react'

import DashboardList from '@/components/dashboard/DashboardList'
import Superbonus from '@/components/dashboard/Superbonus'
import Alert from '@/components/shared/Alert'
import Loading from '@/components/shared/Loading'
import { useCalenderContext } from '@/context/CalenderContext'
import useApi from '@/hooks/useApi'
import useToggle from '@/hooks/useToggle'
import { useUser } from '@/hooks/useUser'

const Dashboard = () => {
  const { admin } = useUser()
  const { isLoading, error, get } = useApi()
  const { dispatch } = useCalenderContext()
  const [modal, displayModal] = useToggle(false)
  const [winner, setWinner] = useState('')

  useEffect(() => {
    const getDashboardCalender = async () => {
      const response = await get('admin/calenders?name=Julekalender')

      if (!error) dispatch({ type: 'SET_DASHBOARD', dashboard: response })
    }

    if (admin) getDashboardCalender()
  }, [admin])

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
