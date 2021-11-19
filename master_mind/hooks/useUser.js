import { useEffect, useState } from 'react'

import { getUserFromCookie } from '@/lib/utils/api'

export const useUser = () => {
  const [user, setUser] = useState({ id: '', username: '' })

  useEffect(() => {
    if (user?.username) return
    const refreshUser = async () => {
      const userFromCookie = await getUserFromCookie()

      if (userFromCookie) {
        setUser(JSON.parse(userFromCookie))
      }
    }

    refreshUser()
  }, [user])

  return { user }
}
