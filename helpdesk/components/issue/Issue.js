import { useState } from 'react'

import CommentForm from './CommentForm'
import Severity from './Severity'
import DateFormatter from '@/lib/dateFormatter'

const Issue = ({ data }) => {
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false)
  // TODO: Bruke DTO
  const {
    id,
    isResolved,
    title,
    description,
    creator,
    severity,
    created_at,
    department: { name: department },
    _count: { comments: coummentsCount },
  } = data

  const date = DateFormatter(created_at)

  // Eller bruk modal?
  const showCommentForm = () => setIsCommentFormVisible(true)

  return (
    <section>
      <header>
        <h1 className="span-2">{title}</h1>
        <p>{department}</p>
        <p>
          <Severity severity={severity} />
        </p>
      </header>
      <p>{description}</p>
      <address rel="author">{creator}</address>
      <footer>
        <time dateTime={date}>{date}</time>
        <ul>
          <li>
            <button type="button">Se kommentarer ({coummentsCount})</button>
          </li>
          <li>
            <button type="button" onClick={showCommentForm}>
              Legg til kommentar
            </button>
          </li>
          <li>
            <button type="button">Avslutt</button>
          </li>
        </ul>
      </footer>
      {isCommentFormVisible && <CommentForm id={id} />}
    </section>
  )
}

export default Issue
