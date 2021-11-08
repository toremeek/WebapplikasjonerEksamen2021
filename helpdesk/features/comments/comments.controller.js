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

// POST
// /api/issues/{id}/comments
export const addComment = async (req, res) => {
  const { id } = req.query
  const { comment } = req.body

  if (!id || !comment)
    return Response(res).badRequest('Missing required fields')

  const addComment = await commentsService.add({ comment, id })

  // Sjekke svar fra server
  const { success, data, error } = addComment
  if (!success) return Response(res).serverError(error)
  return Response(res).ok(data)
}
