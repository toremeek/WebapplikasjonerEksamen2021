/* eslint-disable no-shadow */
import { useState } from 'react'

import axios from 'axios'

import { useIssueContext } from '@/context/IssuesContext'

const useApi = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState()
  const [error, setError] = useState()
  const { dispatch } = useIssueContext()

  // API FUNCTIONS
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
      const response = await axios.put(`/api/issues/${id}`)
      const { data, success } = response.data

      if (success) setData(data)
      setError()
      setIsLoading(false)

      return data
    } catch (err) {
      setError(err)
      setIsLoading(false)

      return err
    }
  }

  // API Funksjoner som oppdaterer context
  // TODO: Burde flyttes til egen hook?
  // Henter alle henvendelser, oppdaterer context
  const getIssues = async () => {
    const result = await get()

    if (!error) dispatch({ type: 'SET_ISSUES', issues: result })
  }

  // Henter filtrerte henvendelser fra api
  const getFilterIssues = async (filter) => {
    const { property, value } = filter
    const result = await get(`${property}/${value}`)

    if (!error) dispatch({ type: 'SET_ISSUES', issues: result })
  }

  // Henter en henvendelse med id
  const getIssue = async (id) => {
    const result = await get(id)

    if (!error) dispatch({ type: 'SET_ISSUE', issue: result })
  }

  // Merker en henvendelse som løst / avsluttet
  const resolve = async (id) => {
    const result = await put(id)

    if (!error) dispatch({ type: 'SET_ISSUE', issue: result })
  }

  // Legger til kommentar til en henvendelse
  const postComment = async (comment, id) => {
    const result = await post({ comment }, `${id}/comments`)

    if (!error) {
      dispatch({
        type: 'ADD_NEW_COMMENT_TO_ISSUE',
        comment: result,
        issueId: id,
      })
    }
  }

  return {
    isLoading,
    data,
    get,
    error,
    post,
    resolve,
    getIssues,
    getIssue,
    getFilterIssues,
    postComment,
  }
}

export default useApi
