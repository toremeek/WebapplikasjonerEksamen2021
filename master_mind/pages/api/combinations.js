// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getUserFromCookie } from '@/lib/utils/api'

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

//lager random kombinasjon av de tilgjenglige fargene //
const getRandomCombination = () => {
  const shuffled = colors.sort(() => 0.5 - Math.random())
  let selected = shuffled.slice(0, 4)
  return selected
}
export default async function handler(req, res) {
  if (req.method === 'GET') {
    res
      .status(200)
      .json({ success: true, combination: getRandomCombination(colors) })
  } else if (req.method === 'POST') {
    res
      .status(405)
      .json({ success: false, message: 'Metoden er ikke tillatt' })
      .end()
  } else if (req.method === 'PUT') {
    res
      .status(405)
      .json({ success: false, message: 'Metoden er ikke tillatt' })
      .end()
  }
}
