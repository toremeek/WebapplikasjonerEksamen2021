import * as issuesController from '@/features/issues/issues.controller'
const handler = async (req, res) => {
  const {
    body,
    method,
    query: { id },
  } = req

  switch (method) {
    case 'GET':
      await issuesController.getIssueExtended(req, res)
      break
    case 'DELETE ':
      // Legger til issue
      res.status(200).json({ success: true, data: 'Fjernet 🐮' })
      break
    case 'PUT':
      res.status(200).json({ success: true, data: 'Alle issues! 🐲' })
    default:
      res.status(400).json({ success: false, error: 'Bad request 💀' })
  }
}

export default handler
