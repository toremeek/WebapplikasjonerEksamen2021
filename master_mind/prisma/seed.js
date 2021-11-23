import { PrismaClient } from '@prisma/client'
import { number } from 'prop-types'

const prisma = new PrismaClient()
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

const user = ['Tore', 'Aleksander', 'Markus']
const numberOfTries = [8, 6, 10]
const foundCombination = [true, true, true]

//lager random kombinasjon av de tilgjenglige fargene //
const getRandomCombination = () => {
  const shuffled = colors.sort(() => 0.5 - Math.random())
  let selected = shuffled.slice(0, 4).join()
  console.log('kombinasjonen', selected)
  return selected
}
const createGame = async () => {
  Promise.all(
    user.map(async (users, index) => {
      await prisma.game.create({
        data: {
          user: users,
          foundCombination: foundCombination[index],
          numberOfTries: numberOfTries[index],
          combination: getRandomCombination(colors),
        },
      })
    })
  )
}
async function main() {
  console.log('Start seeding ...')
  await prisma.game.deleteMany({})
  await createGame()

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
