/* eslint-disable no-ternary */
import Link from 'next/link'

import { useUser } from '@/hooks/useUser'

const Navigation = () => {
  const { admin } = useUser()

  return (
    <header className="">
      <nav>
        <h1 className="title grow ">
          <Link href="/">Julekalender</Link>
        </h1>

        {admin ? (
          <span>
            <Link href="/dashboard">Admin</Link>
          </span>
        ) : null}
      </nav>
    </header>
  )
}

export default Navigation
