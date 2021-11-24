/* eslint-disable no-ternary */
import { useState } from 'react'

import Link from 'next/link'

import GetComments from './GetComments'
import CommentsList from './issue/CommentsList'
import IssueButton from './issue/IssueButton'
import Severity from './issue/Severity'
import PostComment from './PostComment'
import useApi from '@/hooks/useApi'
import DateFormatter from '@/lib/dateFormatter'

// TODO: Fikse dette med en DTO?
const SupportItem = (props) => {
  const { item, extend } = props
  const {
    id,
    title,
    severity,
    description,
    creator,
    isResolved,
    created_at,
    department: { name: department },
    comments,
  } = item

  // Hånderer hva som skal vises
  const [showComments, setShowComments] = useState(false)
  const [addComments, setAddComments] = useState(false)

  // Vise legg til kommentar eller vis kommentarer
  const [display, setDisplay] = useState()
  const { resolve } = useApi()

  const handleShowComments = async () => {
    if (showComments) {
      setShowComments(false)
      setDisplay()
    } else {
      setAddComments(false)
      setShowComments(true)
      setDisplay(<GetComments id={id} comments={comments} />)
    }
  }

  const handleAddComments = () => {
    if (addComments) {
      setAddComments(false)
      setDisplay()
    } else {
      setShowComments(false)
      setAddComments(true)
      setDisplay(<PostComment setAddComments={setAddComments} id={item.id} />)
    }
  }

  // Merker henvendelse om løst
  const handleResolve = () => resolve(id)

  // TODO: Hva blir mest semantisk riktig?? section -> article / article -> section ? Mtp. kommentarer osv.
  return (
    <article>
      <section className="wrapper border light issue">
        <span className="department">{department}</span>
        <Severity severity={severity} />
        <header className="span-2">
          <h1>{extend ? title : <Link href={`/issue/${id}`}>{title}</Link>}</h1>
        </header>
        <p className="description">{description}</p>
        <p className="creator">{creator}</p>
        <footer>
          <time dateTime={DateFormatter(created_at)}>
            {DateFormatter(created_at)}
          </time>
          <nav>
            {comments?.length > 0 && !extend ? (
              <IssueButton
                state={showComments}
                trueText="Lukk kommentarer"
                falseText={`Se kommentarer (${comments?.length})`}
                handler={handleShowComments}
              />
            ) : null}
            <IssueButton
              state={addComments}
              trueText="Lukk"
              falseText="Legg til kommentar"
              handler={handleAddComments}
            />
            <IssueButton
              state={isResolved}
              trueText="Saken er løst"
              falseText="Avslutt"
              handler={handleResolve}
              isResolved={isResolved}
            />
          </nav>
        </footer>
      </section>
      {display || null}
      {extend && comments?.length > 0 ? (
        <CommentsList comments={comments} />
      ) : null}
    </article>
  )
}

export default SupportItem
