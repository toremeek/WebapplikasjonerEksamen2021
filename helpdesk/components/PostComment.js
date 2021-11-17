import { validate } from '@/lib/Validation'
import Validate from '@/lib/validation/validate'
import axios from 'axios'
import { useState } from 'react'
import styled from 'styled-components'

const CommentArea = styled.textarea`
  max-width: 100%;
  height: 100px;
  border: 1px solid black;
`

const PostComment = ({ id, setAddComments, setRecorded }) => {
  const [validationError, setValidationError] = useState()
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
    // validere lengden på kommentaren //
    const isValidComment = Validate.comment(comment)
    if (!isValidComment) {
      setValidationError('Kommentaren er for lang, maks 250 tegn!')
    } else {
      setValidationError(null)
      try {
        const response = await axios.post(
          `http://localhost:3000/api/issues/${id}/comments`,
          { comment }
        )
        setAddComments(false)
        setRecorded(true)
      } catch (err) {
        setError(err?.response?.statusText)
        console.log('noe gikk galt', error)
      }
    }
  }

  return (
    <>
      <section>
        <form onSubmit={handleNewComment}>
          <h2>Legg til en ny kommentar</h2>
          <CommentArea
            type="text"
            id="comment"
            placeholder="Skriv.."
            value={comment}
            onChange={handleCommentChange}
          ></CommentArea>
          <button type="sumbit">Legg til kommentar</button>
          <span>{comment.length}/250</span>
          {validationError?.length > 0 && comment.length > 250 ? (
            <p>
              Kommentaren inneholder {comment.length} tegn, maks er 250 tegn
            </p>
          ) : null}
        </form>
      </section>
    </>
  )
}

export default PostComment
