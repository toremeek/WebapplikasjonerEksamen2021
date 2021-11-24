import { useState } from 'react'
import { ExtendedPlayerInfo } from '../extendendPlayerInfo'

export const ScoreBoardItems = ({ items, index }) => {
  const name = items.user.charAt(0).toUpperCase() + items.user.slice(1)
  const [showInfo, setShowInfo] = useState(false)

  const setShow = () => {
    if (showInfo === true) {
      setShowInfo(false)
    } else {
      setShowInfo(true)
    }
  }
  return (
    <>
      <li id="liste">
        <div className="playerWrapper" onClick={setShow}>
          <div id="leftDiv">
            <p id="place">{index + 1}</p>
          </div>
          <div id="rightDiv">
            <div id="textBox">
              <p id="playerName">{name}</p>
            </div>
          </div>
        </div>
        <div id="extended">
          {showInfo ? <ExtendedPlayerInfo items={items} index={index} /> : null}
        </div>
      </li>
    </>
  )
}
