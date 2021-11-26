const getHints = (gameData) => {
  return gameData.selectedColors?.reduce(
    (hints, color, index) => {
      if (color === gameData.game[index]) {
        hints.positions += 1
      } else if (gameData.game.includes(color)) {
        hints.colors += 1
      }
      return hints
    },
    { positions: 0, colors: 0 }
  )
}

export const giveHints = async (req, res) => {
  const gameData = req.body.dataToApi
  if (gameData.game.length === 4) {
    res.status(200).json({
      success: true,
      data: getHints(gameData),
    })
  } else {
    res.status(500).json({ success: false, message: 'Ingen data å behandle' })
  }
}
