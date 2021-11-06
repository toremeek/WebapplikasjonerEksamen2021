import { Response } from '@/lib/api/apiResponse'
import * as commentsService from './comments.service'

// GET
// /api/issues/{id}/comments
export const listIssueComments = async (req, res) => {
  const { id } = req.query

  if (!id) return Response(res).badRequest('Missing required field: id')

  const issueComments = await commentsService.getIssueComments(id)

  // Sjekke svar fra server
  const { success, data, error } = issueComments
  if (!success) return Response(res).serverError(error)
  return Response(res).ok(data)
}
