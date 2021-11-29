/* eslint-disable no-ternary */
import { useState } from 'react'

import Alert from './shared/Alert'
import Loading from './shared/Loading'
import { useIssueContext } from '@/context/IssuesContext'
import useApi from '@/hooks/useApi'
import Validate from '@/lib/validate'

const PostComment = ({ id }) => {
  const [comment, setComment] = useState('')
  const [validInput, setValidInput] = useState(true)
  const { dispatch } = useIssueContext()
  const { data, post, error, isLoading } = useApi()

  const handleCommentChange = (e) => {
    setComment(e.target.value)
  }

  const handlePostComment = async (event) => {
    event.preventDefault()
    if (Validate.comment(comment)) {
      const result = await post({ comment }, `${id}/comments`)

      if (!error) {
        dispatch({
          type: 'ADD_NEW_COMMENT_TO_ISSUE',
          comment: result,
          issueId: id,
        })
      }
    } else {
      setValidInput(false)
    }
  }

  if (data) return <Alert role="success" text="Din kommentar er nå lagt til!" />
  if (error) return <Alert role="danger" text={error} />

  return (
    <section className="add-comment wrapper border dark">
      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handlePostComment}>
          <h2>Legg til kommentar</h2>
          {!validInput ? (
            <Alert
              role="warning"
              text="En kommentar må være mellom 5 og 250 bokstaver"
            />
          ) : null}
          <textarea
            type="text"
            id="comment"
            placeholder="Skriv.."
            value={comment}
            rows="4"
            onChange={handleCommentChange}
            required
          ></textarea>
          <button type="sumbit">Send</button>
        </form>
      )}
    </section>
  )
}

export default PostComment
