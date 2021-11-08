import * as issuesController from '@/features/issues/issues.controller'
import { Response } from '@/lib/api/apiResponse'
const handler = async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      await issuesController.getIssueExtended(req, res)
      break
    case 'PUT':
      await issuesController.markIssueResovled(req, res)
      break
    default:
      return Response(res).badRequest()
  }
}

export default handler
