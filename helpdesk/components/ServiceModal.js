import { useState } from 'react'
import styled from 'styled-components'
import GetComments from './GetComments'
import PostComment from './PostComment'
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
  max-width: 70%;
  max-height: calc(100vh - 100px);
  height: 100%;
  overflow-y: auto;
  padding: 40px;
`

const CloseSign = styled.span`
  position: absolute;
  top: 0;
  font-size: 1.5rem;
  right: 25px;
  width: 10px;
  height: 10px;
  padding: 10px;
  cursor: pointer;
`

const ServiceModal = ({ item, setModal }) => {
  const severityHigh = item?.severity === 3 ? 'Høy' : null
  const severityMedium = item?.severity === 2 ? 'Medium' : null
  const severityLow = item?.severity === 1 ? 'Lav' : null

  const [addComment, setAddComment] = useState(false)

  const closeModal = () => {
    setModal(false)
  }

  const handleAddComment = () => {
    setAddComment(true)
  }

  return (
    <>
      <StyledModal>
        <InnerModal>
          <CloseSign onClick={closeModal}>X</CloseSign>
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
            <h3>
              {item?.title} {item?.isResolved ? ' (saken er løst)' : null}
            </h3>
            <p>{item?.description}</p>
            <span>{item?.creator}</span>
            <span>{item?.created_at}</span>
            <div className="issue_actions">
              <button type="button" onClick={handleAddComment}>
                Legg til kommentar
              </button>
              <button type="button" onClick={closeModal}>
                Lukk
              </button>
            </div>
            {addComment ? <PostComment id={item.id} /> : null}
            <GetComments id={item.id} />
          </li>
        </InnerModal>
      </StyledModal>
    </>
  )
}

export default ServiceModal
