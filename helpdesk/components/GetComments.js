import useApi from '@/hooks/useApi'
import { useEffect } from 'react'
import CommentsList from './issue/CommentsList'
import Alert from './shared/Alert'
import Loading from './shared/Loading'
/* eslint-disable no-ternary */

const GetComments = (props) => {
  const { id } = props
  const { data, get, error, isLoading } = useApi()

  const fetchComments = () => {
    get(`${id}/comments`)
  }

  useEffect(() => {
    fetchComments()
  }, [])

  return (
    <>
      {isLoading ? <Loading /> : null}
      {error ? <Alert role="danger" text={`Noe gikk galt, ${error}`} /> : null}
      {data?.length > 0 ? <CommentsList comments={data} /> : null}
    </>
  )
}
export default GetComments
