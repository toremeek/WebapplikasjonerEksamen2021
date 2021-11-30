import * as issuesController from '@/features/issues/issues.controller'
import { Response } from '@/lib/api/apiResponse'

// api/issues/{id}
const handler = async (req, res) => {
  const { method } = req

  switch (method?.toUpperCase()) {
    case 'GET':
      await issuesController.getIssueExtended(req, res)
      break
    case 'PUT':
      await issuesController.markIssueResovled(req, res)
      break
    default:
      Response(res).badRequest()
  }
}

export default handler
