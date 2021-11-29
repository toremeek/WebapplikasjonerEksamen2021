import Link from 'next/link'

const Home = () => (
  <>
    <h1>Helpdesk</h1>
    <p className="wrapper border light">
      I denne helpdesken kan du{' '}
      <Link href="/new-issue">
        <a>legge til</a>
      </Link>{' '}
      henvendelser du trenger hjelp til. Du kan også ta en titt på{' '}
      <Link href="/all-issues">
        <a>andre sine</a>
      </Link>{' '}
      problemer og prøve å hjelpe dem.
    </p>
  </>
)

export default Home
