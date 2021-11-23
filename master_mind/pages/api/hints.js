import * as hintsController from '@/features/hints.controller'

export default async function handler(req, res) {
  const { method } = req

  switch (method?.toLowerCase()) {
    case 'post':
      // kaller på kontrolleren som brukes til å lage random kombinasjon
      await hintsController.giveHints(req, res)
      break
    default:
      // gir 405 Method Not Allowed hvis brukeren prøver på noe annet
      // enn post
      res.status(405).end()
  }
}
