import issueCreateDto from './issues.dto'
import * as issuesService from './issues.service'
import { Response } from '@/lib/api/apiResponse'
import Validate from '@/lib/validation/validate'

// GET
// /api/issues
export const listIssues = async (req, res) => {
  const issues = await issuesService.list()

  const { success, error, data } = issues

  if (!success) return Response(res).serverError(error)

  return Response(res).ok(data)
}

// POST
// api/issues
export const createIssue = async (req, res) => {
  //  Fra req.body: { title, description, creator, severity, department }
  if (!Validate.issue(req.body))
    return Response(res).badRequest(
      'Missing required fields: title, description, creator, severity, department'
    )

  const createdIssue = await issuesService.create(issueCreateDto(req.body))

  // TODO: Sjekke server response
  const { success, error, data } = createdIssue

  if (!success) return Response(res).serverError(error)

  return Response(res).created(data)
}

// GET
// api/issues/{id}
export const getIssueExtended = async (req, res) => {
  const { id } = req.query

  if (!id) return Response(res).badRequest('Missing required field: id')

  const issue = await issuesService.getIssueExtended(id)

  const { success, error, data } = issue

  if (!success) return Response(res).serverError(error)

  return Response(res).ok(data)
}

// PUT
// api/issues/{id}
export const markIssueResovled = async (req, res) => {
  const { id } = req.query

  if (!id) return Response(res).badRequest('Missing required field: id')

  const issue = await issuesService.resolve(id)

  const { success, error, data } = issue

  if (!success) return Response(res).serverError(error)

  return Response(res).ok(data)
}
