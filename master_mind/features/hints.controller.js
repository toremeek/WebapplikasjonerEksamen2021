import { validate } from '@/lib/validation'

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

  if (!validate.correctLength(4, gameData.selectedColors)) {
    return res.status(400).json({
      success: false,
      error: 'Not valid length of colors selected',
    })
  }
  if (!validate.correctLength(4, gameData.game)) {
    return res.status(400).json({
      success: false,
      error: 'Not valid length of colors',
    })
  }

  return res.status(200).json({
    success: true,
    data: getHints(gameData),
  })
}
