import { useRouter } from 'next/router'
import SupportItem from '@/components/SupportItem'
import useApi from '@/hooks/useApi'
import { useEffect } from 'react'

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

  // TODO: Lage laster komponent som kan brukes
  if (isLoading) return <p>Laster</p>
  // TODO: Lage en error/beskjed komponent
  return error ? (
    <p>{error} er denne true</p>
  ) : (
    <>
      {data ? <SupportItem key={id} item={data} /> : null}
      <button type="button" onClick={null}>
        Tilbake
      </button>
      {data?.isResolved === false ? (
        <button type="button" onClick={handleResolve}>
          Sett som løst
        </button>
      ) : null}
    </>
  )
}

export default IssuePage
