import Link from 'next/dist/client/link'
const PostIssueSuccess = () => (
  <>
    <h1>Takk for din henvendelse</h1>
    <section className="wrapper border light">
      ✔️ Din henvendelse er nå lagret i databasen, du kan nå ta en titt på{' '}
      <Link href="/all-issues">andre saker</Link> eller lage en{' '}
      <Link href="/new-issue">ny henvendelse</Link>
    </section>
  </>
)

export default PostIssueSuccess
