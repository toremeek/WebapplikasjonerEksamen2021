import styled from 'styled-components'

/* eslint-disable no-ternary */
const SupportItem = ({ item }) => {
  const severityHigh = item?.severity === 'high' ? 'Høy' : null
  const severityMedium = item?.severity === 'medium' ? 'Medium' : null
  const severityLow = item?.severity === 'low' ? 'Lav' : null

  // styled components for de ulike viktighetsgradene //
  const HighSpan = styled.span`
    display: flex;
    font-weight: bold;
    color: #b52424;
    div {
      background-color: #b52424;
      width: 15px;
      height: 15px;
      border-radius: 40px;
      margin: 5px;
    }
  `
  const MediumSpan = styled.span`
    display: flex;
    font-weight: bold;
    color: #dede2f;
    div {
      background-color: #dede2f;
      width: 15px;
      height: 15px;
      border-radius: 40px;
      margin: 5px;
    }
  `
  const LowSpan = styled.span`
    display: flex;
    font-weight: bold;
    color: #4a8c52;
    div {
      background-color: #4a8c52;
      width: 15px;
      height: 15px;
      border-radius: 40px;
      margin: 5px;
    }
  `
  return (
    <li className="issue">
      <div className="meta">
        <span>
          {item?.department.charAt(0).toUpperCase() + item?.department.slice(1)}
        </span>
        {severityHigh ? (
          <HighSpan>
            {severityHigh}
            <div></div>
          </HighSpan>
        ) : null}
        {severityMedium ? (
          <MediumSpan>
            {severityMedium}
            <div></div>
          </MediumSpan>
        ) : null}
        {severityLow ? (
          <LowSpan>
            {severityLow}
            <div></div>
          </LowSpan>
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
          <button type="button">Se kommentarer (2)</button>
          <button type="button">Legg til kommentar</button>
          <button type="button">Avslutt</button>
        </div>
      </footer>
    </li>
  )
}

export default SupportItem
