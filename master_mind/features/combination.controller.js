export const createCombination = async (req, res) => {
  const colors = [
    'red',
    'green',
    'blue',
    'yellow',
    'orange',
    'pink',
    'cyan',
    'gray',
  ]
  const shuffled = colors.sort(() => 0.5 - Math.random())
  let selected = shuffled.slice(0, 4)
  return res.status(200).json({ success: true, combination: selected })
}
