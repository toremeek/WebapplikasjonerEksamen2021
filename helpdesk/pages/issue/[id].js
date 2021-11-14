import { useRouter } from 'next/router'
import SupportItem from '@/components/SupportItem'
import useApi from '@/hooks/useApi'
import { useEffect } from 'react'
import Alert from '@/components/shared/Alert'
import Loading from '@/components/shared/Loading'

const IssuePage = () => {
  const router = useRouter()
  const { id } = router.query

  const { data, error, isLoading, get, resolve } = useApi()

  useEffect(async () => {
    await get(id)
  }, [get, id])

  const handleResolve = () => {
    console.log('Clicked')
    resolve(id)
  }

  const back = () => router.back()

  if (isLoading) return <Loading />
  return (
    <>
      {error ? (
        <Alert role="danger" text={error} />
      ) : data ? (
        <SupportItem item={data} extend />
      ) : null}

      <button type="button" onClick={back}>
        Tilbake
      </button>
    </>
  )
}

export default IssuePage
