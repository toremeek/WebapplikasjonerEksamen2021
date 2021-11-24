/* eslint-disable no-ternary */
import { useState } from 'react'

import Alert from './shared/Alert'
import Loading from './shared/Loading'
import useApi from '@/hooks/useApi'
import Validate from '@/lib/validate'

const PostComment = ({ id }) => {
  const [comment, setComment] = useState('')
  const [validInput, setValidInput] = useState(true)

  const { data, postComment, error, isLoading } = useApi()

  const handleCommentChange = (e) => {
    setComment(e.target.value)
  }

  const handlePostComment = async (event) => {
    event.preventDefault()
    if (Validate.comment(comment)) {
      postComment(comment, id)
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
