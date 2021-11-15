// Generere en streng med 4 tall og 4 bokstaver

const generateCouponCode = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'

  const getRandom = (list, n) =>
    list
      .split('')
      .sort(() => 0.5 - Math.random())
      .slice(0, n)
      .join('')

  return `${getRandom(letters, 4)}${getRandom(numbers, 4)}`
}

export default generateCouponCode
