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

  if (data) return <Alert role="success" text="Din kommentar er nå lagt til!" />
  if (error) return <Alert role="danger" text={error} />

  return (
    <section className="add-comment wrapper border dark">
      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={postComment}>
          <h2>Legg til kommentar</h2>
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
