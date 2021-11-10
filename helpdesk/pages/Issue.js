import { useRouter } from 'next/router'

const Issue = () => {
  const router = useRouter()
  return <h1>{router.query}</h1>
}

export default Issue
