/* eslint-disable no-ternary */
import Link from 'next/link'

import { useUser } from '@/hooks/useUser'

const Navigation = () => {
  const { admin } = useUser()

  return (
    <header>
      <h1>Julekalender</h1>
      <nav>
        <ul>
          <li>
            <Link href="/">Hjem</Link>
          </li>
          {admin ? (
            <li>
              <Link href="/dashboard">Admin</Link>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  )
}

export default Navigation
