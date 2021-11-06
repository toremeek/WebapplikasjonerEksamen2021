import * as commentsService from './comments.service'

// GET
// /api/issues/{id}/comments
export const listIssueComments = async (req, res) => {
  const { id } = req.query

  if (!id)
    return res
      .status(400)
      .json({ success: false, error: 'Missing required field: id' })

  const issueComments = await commentsService.getIssueComments(id)

  // Sjekke svar fra server
  if (!issueComments.success)
    return res.status(500).json({ success: false, error: issueComments.error })

  return res.status(200).json(issueComments)
}
