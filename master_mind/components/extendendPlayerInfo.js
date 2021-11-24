export const ExtendedPlayerInfo = ({ items, index }) => {
  return (
    <>
      <section className="extendedInfo">
        <p>Antall forsøk: {items.numberOfTries}</p>
        <p>Kombinasjon: {items.combination.toString()}</p>
      </section>
    </>
  )
}
