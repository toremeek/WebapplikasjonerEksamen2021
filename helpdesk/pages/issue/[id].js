/* eslint-disable no-ternary */
/* eslint-disable no-nested-ternary */
import { useEffect } from 'react'

import { useRouter } from 'next/router'

import Alert from '@/components/shared/Alert'
import Loading from '@/components/shared/Loading'
import SupportItem from '@/components/SupportItem'
import { useIssueContext } from '@/context/IssuesContext'
import useApi from '@/hooks/useApi'

const IssuePage = () => {
  const router = useRouter()
  const { id } = router.query
  const { state } = useIssueContext()
  const { error, isLoading, getIssue } = useApi()

  // Henter hele henvendelsen fra api når siden lastes og oppdaterer context.
  useEffect(() => {
    getIssue(id)
  }, [])

  // TODO: Tungvind måte å gjøre dette på. Itererer over issue arrayen for å finne riktig. 💩
  const getIssueStateId = (issueId) => {
    const { issues } = state

    return issues.findIndex((issue) => issue.id === issueId)
  }

  const issue = state.issues[getIssueStateId(id)]

  const back = () => router.back()

  if (isLoading) return <Loading />

  return (
    <>
      {error ? (
        <Alert role="danger" text={error} />
      ) : issue ? (
        <SupportItem item={issue} extend />
      ) : null}

      <button type="button" className="mt-2" onClick={back}>
        Tilbake
      </button>
    </>
  )
}

export default IssuePage
