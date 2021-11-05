import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getRandomIndex = (max) => Math.floor(Math.random() * max)
const getRandomText = (list) => list[getRandomIndex(list.length - 1)]

// Dummydata
const departments = ['IT', 'Design', 'Salg']

// Hentet fra SAMUEL L. IPSUM - slipsum.com
const content = [
  "My money's in that office, right? If she start giving me some bullshit about it ain't there, and we got to go someplace else and get it, I'm gonna shoot you in the head then and there. Then I'm gonna shoot that bitch in the kneecaps, find out where my goddamn money is. She gonna tell me too. Hey, look at me when I'm talking to you, motherfucker. You listen: we go in there, and that nigga Winston or anybody else is in there, you the first motherfucker to get shot. You understand?",
  "Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.",
  "The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.",
  "Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends.",
  "Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows. Some pilots get picked and become television programs. Some don't, become nothing. She starred in one of the ones that became nothing.",
  "Now that there is the Tec-9, a crappy spray gun from South Miami. This gun is advertised as the most popular gun in American crime. Do you believe that shit? It actually says that in the little book that comes with it: the most popular gun in American crime. Like they're actually proud of that shit. ",
]

const titles = [
  'I can do that',
  'We happy?',
  'Hold on to your butts',
  "I'm serious as a heart attack",
]

// TODO: Gjøre resten dynamisk, slik at vi kan generere X antall issues?
// må da fjerne unique fra issue.title hvis random funksjon skal brukes
const issues = [
  {
    creator: 'Marius Wallin',
    severity: 1,
  },
  {
    creator: 'Simen Simensen',
    severity: 2,
  },
  {
    creator: 'Trude Trudesen',
    severity: 3,
  },
]

const createIssues = async () => {
  Promise.all(
    issues.map(async (issue, index) => {
      await prisma.issue.create({
        data: {
          ...issue,
          title: titles[index],
          description: getRandomText(content),
          department: {
            create: { name: departments[index] },
          },
          comments: {
            create: { comment: getRandomText(content) },
          },
        },
      })
    })
  )
}

async function main() {
  console.log('Start seeding ...')

  // Tømmer databasen
  await prisma.comment.deleteMany({})
  await prisma.issue.deleteMany({})
  await prisma.department.deleteMany({})

  // Kalle på seed funksjoner
  await createIssues()

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
