import { useUser } from '@/hooks/useUser'
import Link from 'next/link'

const Navigation = () => {
  const { admin } = useUser()
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Hjem</Link>
        </li>
        {
          //Sjekker om bruker er admin, hvis ja, kan navigere til dashboardsiden
          admin ? (
            <li>
              <Link href="/dashboard">Admin</Link>
            </li>
          ) : null
        }
      </ul>
    </nav>
  )
}

export default Navigation
