import { useState } from 'react'

import axios from 'axios'

const postCommentToDb = (id, comment) => {
  try {
    axios.post(`http://localhost:3000/api/issues/${id}/comments`, { comment })

    console.log('YAY')
  } catch (error) {
    console.log('FAIIIIL', error)
  }
}

const CommentForm = ({ id }) => {
  const [comment, setComment] = useState('')

  const handleChange = (event) => setComment(event.target.value)
  const submitNewComment = (event) => {
    event.preventDefault()

    // TODO: Input validering
    postCommentToDb(id, comment)
  }

  return (
    <form onSubmit={submitNewComment}>
      <h2>Legg til en ny kommentar</h2>
      <textarea
        type="text"
        id="comment"
        placeholder="Skriv.."
        value={comment}
        onChange={handleChange}
      ></textarea>
      <button type="sumbit">Legg til kommentar</button>
    </form>
  )
}

export default CommentForm
