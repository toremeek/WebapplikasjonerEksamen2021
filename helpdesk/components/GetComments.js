/* eslint-disable no-ternary */
import CommentsList from './issue/CommentsList'
import Alert from './shared/Alert'

const GetComments = (props) => {
  const { comments } = props

  return comments?.length > 0 ? (
    <CommentsList comments={comments} />
  ) : (
    <Alert role="danger" text={'Finner ingen kommentarer..'} />
  )
}

export default GetComments
