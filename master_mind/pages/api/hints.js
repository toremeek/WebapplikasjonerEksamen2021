const getHints = (state) => {
  return state.selectedColors?.reduce(
    (hints, color, index) => {
      if (color === state.game[index]) {
        hints.positions += 1
      } else if (state.game.includes(color)) {
        hints.colors += 1
      }
      console.log('hint', hints)
      return hints
    },
    { positions: 0, colors: 0 }
  )
}

//tar i mot kopi av state, som sendes til getHints, som returnerer hints og color//
export default function hints(req, res) {
  if (req.method === 'POST') {
    const gameData = req.body
    if (gameData.length === 0) {
      res.status(400).json({
        success: false,
        message: 'Ingen data mottatt',
      })
    }
    res.status(200).json({
      success: true,
      data: getHints(gameData.dataToApi),
    })
  } else {
    req.status(400).json({
      succes: false,
      message: 'Du kan bare poste til dette api-et',
    })
  }
}
