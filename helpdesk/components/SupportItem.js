import { useState } from 'react'
import styled from 'styled-components'
import GetComments from './GetComments'
import PostComment from './PostComment'
import ServiceModal from './ServiceModal'

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

/* eslint-disable no-ternary */
const SupportItem = ({ item }) => {
  const [buttonText, setButtonText] = useState(
    `Se kommentarer (${item._count.comments})`
  )
  const [commentButtonText, setCommentButtonText] =
    useState('Legg til kommentar')
  const [modal, setModal] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [addComments, setAddComments] = useState(false)
  const severityHigh = item?.severity === 3 ? 'Høy' : null
  const severityMedium = item?.severity === 2 ? 'Medium' : null
  const severityLow = item?.severity === 1 ? 'Lav' : null

  const showModal = () => {
    setModal(true)
  }

  const handleShowComments = () => {
    if (!showComments) {
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
      setCommentButtonText('Angre kommentar')
    } else {
      setAddComments(false)
      setCommentButtonText('Legg til kommentar')
    }
  }
  return (
    <>
      {modal ? (
        <ServiceModal item={item} setModal={setModal} id={item.id} />
      ) : null}
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
        <span>{item.description}</span>
        <span id="creator">{item.creator}</span>
        <div className="meta">
          {/*TODO: formater tidsstrengen*/}
          <span>{item.created_at}</span>
          {item._count.comments > 0 ? (
            <button type="button" id="kommentarer" onClick={handleShowComments}>
              {buttonText}
            </button>
          ) : null}
          <button type="button" onClick={handleAddComments}>
            {commentButtonText}
          </button>
          <button type="button" onClick={showModal}>
            Åpne saken
          </button>
        </div>
        {addComments ? <PostComment id={item.id} /> : null}
        {showComments ? <GetComments id={item.id} /> : null}
      </li>
    </>
  )
}

export default SupportItem
