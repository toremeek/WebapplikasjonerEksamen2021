import AdminModal from '@/components/AdminModal'
import DashboardItem from '@/components/DashboardItem'
import { useUser } from '@/hooks/useUser'
import React from 'react'

const dashboard = () => {
  const { admin } = useUser()
  return (
    <>
      {admin ? (
        <>
          <DashboardItem />
          <DashboardItem />
        </>
      ) : (
        <p>Bare admin har tilgang her</p>
      )}
    </>
  )
}

export default dashboard
