import { useCallback, useState } from 'react'

import axios from 'axios'

const useApi = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState()
  const [error, setError] = useState()

  const get = useCallback(async (url) => {
    setIsLoading(true)
    try {
      const response = await axios.get(`/api/issues/${url}`)
      const { data, success } = response.data

      if (success) setData(data)
      setError()
    } catch (err) {
      setError(err.response.data.error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const post = useCallback(async (task) => {
    setIsLoading(true)
    try {
      const response = await axios.post('/api/issues', { task })
      const { data, success } = response.data

      if (success) setData(data)
      setError()
    } catch (err) {
      setError(err.response?.data?.error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // const remove = useCallback(
  //   async (id) => {
  //     setIsLoading(true)
  //     try {
  //       await axios.delete(`/api/todos/${id}`)
  //       get()
  //     } catch (err) {
  //       setError(err)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   },
  //   [get]
  // )

  const resolve = useCallback(
    async (id) => {
      console.log(id)
      setIsLoading(true)
      try {
        await axios.put(`/api/issues/${id}`)
        get()
      } catch (err) {
        setError(err)
      } finally {
        setIsLoading(false)
      }
    },
    [get]
  )

  return { isLoading, data, get, error, post, resolve }
}

export default useApi
