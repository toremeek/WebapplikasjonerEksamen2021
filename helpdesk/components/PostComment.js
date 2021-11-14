import { useEffect, useState } from 'react'
import Loading from './shared/Loading'
import Alert from './shared/Alert'
import useApi from '@/hooks/useApi'

const PostComment = ({ id, setAddComments }) => {
  const [comment, setComment] = useState('')

  const { data, post, error, isLoading } = useApi()

  const handleCommentChange = (e) => {
    setComment(e.target.value)
  }

  const postComment = (event) => {
    event.preventDefault()
    post(`${id}/comments`, { comment })
  }

  return (
    <section className="add-comment wrapper border dark">
      <h2>Legg til kommentar</h2>
      {error ? <Alert role="danger" text={error} /> : null}
      {isLoading ? (
        <Loading />
      ) : data ? (
        <Alert role="success" text="Din kommentar er nå lagt til!" />
      ) : (
        <form onSubmit={postComment}>
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
