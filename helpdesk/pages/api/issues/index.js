import * as issuesController from '@/features/issues/issues.controller'

const handler = async (req, res) => {
  const { method } = req

  switch (method?.toUpperCase()) {
    // Henter alle issues
    case 'GET':
      await issuesController.listIssues(req, res)
      break

    // Legg til issue
    case 'POST':
      await issuesController.createIssue(req, res)
      break

    default:
      res.status(405).end()
  }
}

export default handler
