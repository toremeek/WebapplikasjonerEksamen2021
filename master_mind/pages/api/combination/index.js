import * as combinationController from '@/features/feeds/combination.controller'

export default async function handler(req, res) {
  const { method } = req

  switch (method?.toLowerCase()) {
    case 'post':
      // kaller på kontrolleren som brukes til å lage ny feed
      await combinationController.createCombination(req, res)
      break
    case 'get':
      // kaller på kontrolleren som brukes til å hente alle feeds
      await combinationController.getCombination(req, res)
      break
    default:
      // gir 405 Method Not Allowed hvis brukeren prøver på noe annet
      // enn GET eller POST
      res.status(405).end()
  }
}
