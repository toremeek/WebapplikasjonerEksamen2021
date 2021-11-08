import * as filterController from '@/features/filter/filter.controller'

const handler = async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      // Returnerer filtrerte issues
      await filterController.filterIssues(req, res)
      break
    default:
      res.status(405).end()
  }
}

export default handler
