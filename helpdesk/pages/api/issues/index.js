import * as issuesController from '@/features/issues/issues.controller'
import { Response } from '@/lib/api/apiResponse'

// api/issues
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
      return Response(res).badRequest()
  }
}

export default handler
