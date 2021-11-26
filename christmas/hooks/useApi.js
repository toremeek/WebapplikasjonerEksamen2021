/* eslint-disable no-shadow */
import { useState } from 'react'

import axios from 'axios'

const useApi = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState()
  const [error, setError] = useState()

  const get = async (url) => {
    setIsLoading(true)
    try {
      const response = await axios.get(`/api/${url}`)
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

  const post = async (url = '', body) => {
    setIsLoading(true)
    try {
      const response = await axios.post(`/api/${url}`, body)
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

  const put = async (url, body = '') => {
    setIsLoading(true)
    try {
      const response = await axios.put(`/api/${url}`, body)
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

  return {
    isLoading,
    data,
    get,
    put,
    error,
    post,
  }
}

export default useApi
