import Alert from '../shared/Alert'

const CommentsList = ({ comments }) => {
  if (comments?.length < 1)
    return <Alert role="warning" text="Ingenting å vise her!" />

  return (
    <section className="wrapper flex">
      {comments.map((comment, index) => (
        <article className="comments wrapper border dark" key={comment.id}>
          <h3>Kommentar {index + 1}</h3>
          <p>{comment.comment}</p>
        </article>
      ))}
    </section>
  )
}

export default CommentsList
