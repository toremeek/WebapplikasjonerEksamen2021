import * as commentsController from '@/features/comments/comments.controller'
import { Response } from '@/lib/api/apiResponse'

const handler = async (req, res) => {
  const { method } = req

  switch (method?.toUpperCase()) {
    case 'GET':
      await commentsController.listIssueComments(req, res)
      break
    case 'POST':
      await commentsController.addComment(req, res)
      break
    default:
      Response(res).badRequest()
  }
}

export default handler
