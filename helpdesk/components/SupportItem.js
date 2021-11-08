import { useState } from 'react'
import ServiceModal from './ServiceModal'

/* eslint-disable no-ternary */
const SupportItem = ({ item, apiData }) => {
  const [modal, setModal] = useState(false)
  const severityHigh = item?.severity === 'high' ? 'Høy' : null
  const severityMedium = item?.severity === 'medium' ? 'Medium' : null
  const severityLow = item?.severity === 'low' ? 'Lav' : null

  const showModal = () => {
    setModal(true)
  }
  return (
    <>
      {modal ? <ServiceModal item={item} setModal={setModal} /> : null}
      <li className="issue" onClick={showModal}>
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
        <footer>
          <span>{item?.createdAt}</span>
          <div className="issue_actions">
            {/* <button type="button">Se kommentarer (2)</button>
            <button type="button">Legg til kommentar</button>
            <button type="button">Avslutt</button> */}
            <button id="point" type="button" onClick={showModal}>
              Åpne saken
            </button>
          </div>
        </footer>
      </li>
    </>
  )
}

export default SupportItem
