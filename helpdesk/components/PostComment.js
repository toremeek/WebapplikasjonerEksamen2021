import axios from 'axios'
import { useState } from 'react'

const PostComment = ({ id, setAddComments }) => {
  const [comment, setComment] = useState('')
  const [error, setError] = useState(false)
  const handleNewComment = async (event) => {
    event.preventDefault()
    await postComment()
  }
  const handleCommentChange = (e) => {
    setComment(e.target.value)
  }

  const postComment = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/issues/${id}/comments`,
        { comment }
      )
      setAddComments(false)
    } catch (err) {
      setError(err.response.statusText)
      console.log('noe gikk galt', error)
    }
  }

  return (
    <section className="add-comment wrapper dark">
      <form onSubmit={handleNewComment}>
        <h2>Legg til kommentar</h2>
        <textarea
          type="text"
          id="comment"
          placeholder="Skriv.."
          value={comment}
          rows="4"
          onChange={handleCommentChange}
        ></textarea>
        <button type="sumbit">Send</button>
      </form>
    </section>
  )
}

export default PostComment
