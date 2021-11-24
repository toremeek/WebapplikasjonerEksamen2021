import Link from 'next/link'

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link href="/new-issue">
            <a>Ny sak</a>
          </Link>
        </li>
        <li>
          <Link href="/all-issues">
            <a>Alle saker</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
