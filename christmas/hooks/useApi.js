/* eslint-disable no-shadow */
import { useCallback, useState } from 'react'

import axios from 'axios'

import { useCalenderContext } from '@/context/CalenderContext'

const useApi = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState()
  const [error, setError] = useState()
  const { dispatch } = useCalenderContext()

  const get = useCallback(async (url) => {
    setIsLoading(true)
    try {
      const response = await axios.get(`/api/${url}`)
      const { data, success } = response.data

      if (success) setData(data)
      dispatch({ type: 'SET_CALENDER', calender: data })
      setError()
    } catch (err) {
      setError(err.response.data.error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const post = useCallback(async (url, task) => {
    setIsLoading(true)
    try {
      const response = await axios.post(`/api/issues/${url}`, task)
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

  // Henter kalender fra databasen, oppdaterer CalenderContext
  const getCalender = async (name) => {
    setIsLoading(true)
    try {
      const response = await axios.get(`/api/calenders?name=${name}`)
      const { data, success } = response.data

      if (success) dispatch({ type: 'SET_CALENDER', calender: data })
      setError()
    } catch (err) {
      setError(err.response.data.error)
    } finally {
      setIsLoading(false)
    }
  }

  // Åpner en luke, oppdatere CalenderContext
  const openSlot = useCallback(async (id) => {
    setIsLoading(true)
    try {
      const response = await axios.put(`/api/slots/${id}`)
      const { data, success } = response.data

      if (success) dispatch({ type: 'OPEN_SLOT', ...data })
      setError()
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getDashboardCalender = async (name) => {
    setIsLoading(true)
    try {
      const response = await axios.get(
        `http://localhost:3000/api/admin/calenders?name=${name}`
      )
      const { data, success } = response.data

      if (success) dispatch({ type: 'SET_DASHBOARD', dashboard: data })
      setError()
    } catch (err) {
      setError(err.response.data.error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    data,
    get,
    error,
    post,
    openSlot,
    getCalender,
    getDashboardCalender,
  }
}

export default useApi
