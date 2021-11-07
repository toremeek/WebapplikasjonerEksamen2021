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

  const closeModal = () => {
    setModal(false)
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
            <button type="button">Se kommentarer (2)</button>
            <button type="button">Legg til kommentar</button>
            <button type="button" onClick={closeModal}>
              Lukk
            </button>
          </div>
        </InnerModal>
      </StyledModal>
    </>
  )
}

export default ServiceModal
