import * as commentsController from '@/features/comments/comments.controller'

const handler = async (req, res) => {
  const { method } = req

  switch (method?.toUpperCase()) {
    case 'GET':
      await commentsController.listIssueComments(req, res)
      break

    default:
      res.status(400).json({ success: false, error: 'Bad request 💀' })
  }
}

export default handler
