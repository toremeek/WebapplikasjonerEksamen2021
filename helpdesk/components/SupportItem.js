import DateFormatter from '@/lib/dateFormatter'
import { useRouter } from 'next/router'
import { useState } from 'react'
import GetComments from './GetComments'
import IssueButton from './issue/IssueButton'
import Severity from './issue/Severity'
import PostComment from './PostComment'
import Link from 'next/link'

/* eslint-disable no-ternary */
const SupportItem = ({ item }) => {
  const {
    id,
    title,
    severity,
    description,
    creator,
    isResolved,
    created_at,
    department: { name: department },
    // _count: { comments: commentsCount = 0 },
  } = item

  // Hånderer hva som skal vises
  const [showComments, setShowComments] = useState(false)
  const [addComments, setAddComments] = useState(false)

  // Vise legg til kommentar eller vis kommentarer
  const [display, setDisplay] = useState()

  const handleShowComments = () => {
    if (showComments) {
      setShowComments(false)
      setDisplay()
    } else {
      setShowComments(true)
      setDisplay(<GetComments id={item.id} />)
    }
  }

  const handleAddComments = () => {
    if (addComments) {
      setAddComments(false)
      setDisplay()
    } else {
      setAddComments(true)
      setDisplay(<PostComment setAddComments={setAddComments} id={item.id} />)
    }
  }
  const router = useRouter()
  const nextPage = () => {
    localStorage.setItem('item', JSON.stringify(item))
    router.push(`/Issue/`, `/Issue/${item.title}`)
  }

  const handleResolve = () => {
    console.log('Clicked')
    resolve(id)
  }

  // TODO: Hva blir mest semantisk riktig?? section -> article / article -> section ? Mtp. kommentarer osv.
  return (
    <section>
      <article className="wrapper light issue">
        <span className="department">{department}</span>
        <Severity severity={severity} />
        <header>
          <h1>
            <Link href={`/issue/${id}`}>{title}</Link>
          </h1>
        </header>
        <p className="description">{description}</p>
        <p className="creator">{creator}</p>
        <footer>
          <time dateTime={DateFormatter(created_at)}>
            {DateFormatter(created_at)}
          </time>
          <nav>
            {item._count?.comments > 0 ? (
              <IssueButton
                state={showComments}
                trueText="Lukk kommentarer"
                falseText={`Se kommentarer (${item._count?.comments})`}
                handler={handleShowComments}
              />
            ) : null}
            <IssueButton
              state={addComments}
              trueText="Angre kommentar"
              falseText="Legg til kommentar"
              handler={handleAddComments}
            />
            <IssueButton
              state={isResolved}
              trueText="Saken er løst"
              falseText="Avslutt"
            />
          </nav>
        </footer>
      </article>
      {display ? display : null}
    </section>
  )
}

export default SupportItem
