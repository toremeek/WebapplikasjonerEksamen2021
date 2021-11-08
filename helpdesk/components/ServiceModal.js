import { useState } from 'react'
import styled from 'styled-components'
const StyledModal = styled.section`
  display: flex;
  z-index: 1;
  width: 100%;
  height: 100vh;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.753);
  position: fixed;
  top: 0;
  left: 0;
`
const InnerModal = styled.section`
  position: relative;
  text-align: left;
  background-color: rgb(255, 255, 255);
  color: black;
  max-width: 40%;
  max-height: calc(100vh - 210px);
  overflow-y: auto;
  padding: 40px;
`

const CloseSign = styled.span`
  position: absolute;
  top: 0;
  font-size: 1.5rem;
  right: 0;
  padding: 10px;
  cursor: pointer;
`

const ServiceModal = ({ item, setModal }) => {
  const severityHigh = item?.severity === 'high' ? 'Høy' : null
  const severityMedium = item?.severity === 'medium' ? 'Medium' : null
  const severityLow = item?.severity === 'low' ? 'Lav' : null

  const [showComments, setShowComments] = useState(false)
  const [addComment, setAddComment] = useState(false)
  const [comment, setComment] = useState('')

  const closeModal = () => {
    setModal(false)
  }
  const handleShowComments = () => {
    setShowComments(true)
  }
  const handleCloseComments = () => {
    setShowComments(false)
  }
  const handleAddComment = () => {
    setAddComment(true)
  }

  const handleNewComment = (e) => {
    e.preven
  }
  const handleCommentChange = (e) => {
    e.preventDefault()
    setComment(e.target.value)
  }
  return (
    <>
      <StyledModal>
        <InnerModal>
          <CloseSign onClick={closeModal}>X</CloseSign>
          <div className="meta">
            <span>
              {item?.department.charAt(0).toUpperCase() +
                item?.department.slice(1)}
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
          <h3>
            {item?.title} {item?.isResolved ? '(løst)' : null}
          </h3>
          <p>{item?.description}</p>
          <span>{item?.creator}</span>
          <span>{item?.createdAt}</span>
          <div className="issue_actions">
            {showComments ? (
              <button type="button" onClick={handleCloseComments}>
                Lukk kommentar(er)
              </button>
            ) : (
              <button type="button" onClick={handleShowComments}>
                Se kommentarer ({item.comments.length})
              </button>
            )}
            <button type="button" onClick={handleAddComment}>
              Legg til kommentar
            </button>
            <button type="button" onClick={closeModal}>
              Lukk
            </button>
          </div>
          {showComments ? <p>Kommentarer</p> : null}
          <ul>
            {showComments
              ? item.comments.map((comment, index) => (
                  <li key={index}>
                    <p>{comment}</p>
                  </li>
                ))
              : null}
          </ul>
          {addComment ? (
            <form onSubmit={handleNewComment}>
              <h2>Legg til en ny kommentar</h2>
              <textarea
                type="text"
                id="comment"
                placeholder="Skriv.."
                value={comment}
                onChange={handleCommentChange}
              ></textarea>
              <button type="sumbit">Legg til kommentar</button>
            </form>
          ) : null}
        </InnerModal>
      </StyledModal>
    </>
  )
}

export default ServiceModal
