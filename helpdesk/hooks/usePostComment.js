const { useState, useEffect } = require('react')
import axios from 'axios'

const usePostComment = ({ comment, id }) => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const postComment = async () => {
    try {
      setLoading(true)
      const response = await axios.post(
        `http://localhost:3000/api/${id}/comments`,
        { comment }
      )
      if (response?.data?.success) {
        setLoading(false)
        console.log(response)
      }
    } catch (error) {
      setError(error)
    }
  }
  useEffect(() => {
    postComment()
  }, [comment])

  return { error, loading }
}

export default usePostComment
