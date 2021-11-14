import Link from 'next/link'

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link href="/">
            <a className="first">Ny sak</a>
          </Link>
        </li>
        <li>
          <Link href="/allIssues">
            <a className="first">Alle saker</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
