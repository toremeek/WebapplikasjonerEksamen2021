const { useState, useEffect } = require('react')
import axios from 'axios'

const useGetData = ({ url }) => {
  const [apiData, setApiData] = useState()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const doSearch = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:3000/api/${url}`)
      const data = await response?.data
      setApiData(data)
      setLoading(false)
    } catch (error) {
      setError(error)
    }
  }
  useEffect(() => {
    doSearch()
  }, [])

  return { apiData, error, loading }
}

export default useGetData
