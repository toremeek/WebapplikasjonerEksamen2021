export const ScoreBoardItems = ({ items, index }) => {
  const name = items.user.charAt(0).toUpperCase() + items.user.slice(1)

  return (
    <li
      id="liste"
      className="playerWrapper"
      // initial={{ scale: 0.5, opacity: 0 }}
      // animate={{ opacity: 1, scale: 1 }}
      // transition={{ duration: 0.5 }}
    >
      <div id="leftDiv">
        <p id="place">{index + 1}</p>
      </div>
      <div id="rightDiv">
        <div id="textBox">
          <p id="playerName">{name}</p>
          <p id="playerInfo">Forsøk: {items.numberOfTries}</p>
          <p id="playerInfo">Kombinasjon: {items.combination.toString()}</p>
        </div>
      </div>
    </li>
  )
}
