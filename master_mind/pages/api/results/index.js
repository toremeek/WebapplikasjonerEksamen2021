import * as resultsController from 'features/results.controller'

export default async function handler(req, res) {
  const { method } = req
  console.log(method)
  console.log(req.body)
  switch (method?.toLowerCase()) {
    case 'post':
      // kaller på kontrolleren som brukes til å lage ny feed
      await resultsController.createResult(req, res)
      break
    case 'get':
      // kaller på kontrolleren som brukes til å hente alle feeds
      await resultsController.listResults(req, res)
      break
    default:
      // gir 405 Method Not Allowed hvis brukeren prøver på noe annet
      // enn GET eller POST
      res.status(405).end()
  }
}
