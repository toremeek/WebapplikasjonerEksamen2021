import * as commentsService from './comments.service'
import { Response } from '@/lib/api/apiResponse'

// GET
// /api/issues/{id}/comments
export const listIssueComments = async (req, res) => {
  const { id } = req.query

  if (!id) return Response(res).badRequest('Missing required field: id')

  // Sjekke svar fra server
  const { success, data, error } = await commentsService.getIssueComments(id)

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

  // Sjekke svar fra server
  const { success, data, error } = await commentsService.add({ comment, id })

  if (!success) return Response(res).serverError(error)

  return Response(res).ok(data)
}
