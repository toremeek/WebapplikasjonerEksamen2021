import DateFormatter from '@/lib/dateFormatter'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'
import GetComments from './GetComments'
import PostComment from './PostComment'

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

/* eslint-disable no-ternary */
const SupportItem = ({ item }) => {
  const [buttonText, setButtonText] = useState(
    `Se kommentarer (${item._count.comments})`
  )
  const [showComments, setShowComments] = useState(false)
  const [addComments, setAddComments] = useState(false)
  const severityHigh = item?.severity === 3 ? 'Høy' : null
  const severityMedium = item?.severity === 2 ? 'Medium' : null
  const severityLow = item?.severity === 1 ? 'Lav' : null
  const [recorded, setRecorded] = useState(false)

  const handleShowComments = () => {
    if (!showComments) {
      setAddComments(false)
      setShowComments(true)
      setButtonText('Lukk kommentarer')
    } else {
      setShowComments(false)
      setButtonText(`Se kommentarer (${item._count.comments})`)
    }
  }
  const handleAddComments = () => {
    if (!addComments) {
      setAddComments(true)
    } else {
      setAddComments(false)
    }
  }
  const router = useRouter()
  const nextPage = () => {
    localStorage.setItem('item', JSON.stringify(item))
    router.push(`/Issue/`, `/Issue/${item.title}`)
  }

  const handleResolved = async () => {
    try {
      await axios.put(`http://localhost:3000/api/issues/${item.id}`)
    } catch (err) {
      console.log('noe gikk galt', err)
    }
  }
  return (
    <>
      <li className="issue">
        <div className="meta">
          <span>
            {item?.department.name.charAt(0).toUpperCase() +
              item?.department.name.slice(1)}
          </span>
          {severityHigh ? (
            <span className="high">
              {severityHigh}
              <div></div>
            </span>
          ) : null}
          {severityMedium ? (
            <span className="medium">
              {severityMedium}
              <div></div>
            </span>
          ) : null}
          {severityLow ? (
            <span className="low">
              {severityLow}
              <div></div>
            </span>
          ) : null}
        </div>
        <h3>{item.title}</h3>
        <p>
          <strong>Status:</strong>{' '}
          {item.isResolved ? <span>Løst</span> : <span>Ikke løst</span>}
        </p>
        <span>{item.description}</span>
        <span id="creator">{item.creator}</span>
        <div className="meta">
          <time dateTime={DateFormatter(item.created_at)}>
            {DateFormatter(item.created_at)}
          </time>
          {item._count.comments > 0 ? (
            <button type="button" id="kommentarer" onClick={handleShowComments}>
              {buttonText}
            </button>
          ) : null}
          <button type="button" onClick={handleAddComments}>
            {addComments ? (
              <span>Angre kommentar</span>
            ) : (
              <span>Legg til kommentar</span>
            )}
          </button>
          {item.isResolved === false ? (
            <button type="button" onClick={handleResolved}>
              Sett som løst
            </button>
          ) : null}
          <button type="button" onClick={nextPage}>
            Åpne saken
          </button>
        </div>
        {recorded ? <p>Din kommentar er lagret</p> : null}
        {addComments ? (
          <PostComment
            setAddComments={setAddComments}
            setRecorded={setRecorded}
            id={item.id}
          />
        ) : null}
        {showComments ? <GetComments id={item.id} /> : null}
      </li>
    </>
  )
}

export default SupportItem
