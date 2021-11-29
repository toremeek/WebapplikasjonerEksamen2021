/* eslint-disable no-shadow */
import { useState } from 'react'

import axios from 'axios'

const useApi = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState()
  const [error, setError] = useState()

  // GET
  const get = async (url = '') => {
    setIsLoading(true)
    try {
      const response = await axios.get(`/api/issues/${url}`)
      const { data, success } = response.data

      if (success) setData(data)
      setError()
      setIsLoading(false)

      return data
    } catch (err) {
      setError(err.response.data.error)
      setIsLoading(false)

      return err
    }
  }

  // POST
  const post = async (task, url = '') => {
    setIsLoading(true)
    try {
      const response = await axios.post(`/api/issues/${url}`, task)
      const { data, success } = response.data

      if (success) setData(data)
      setError()
      setIsLoading(false)

      return data
    } catch (err) {
      setError(err.response?.data?.error)
      setIsLoading(false)

      return err
    }
  }

  // PUT
  const put = async (id) => {
    setIsLoading(true)
    try {
      const response = await axios.put(`/api/issues/${id}asdasd`)
      const { data, success } = response.data

      if (success) setData(data)
      setError()
      setIsLoading(false)

      return data
    } catch (err) {
      setError(err.response?.data?.error)
      setIsLoading(false)

      return err
    }
  }

  return {
    isLoading,
    data,
    get,
    error,
    post,
    put,
  }
}

export default useApi
