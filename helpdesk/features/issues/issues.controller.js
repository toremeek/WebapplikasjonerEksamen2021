import { Response } from '@/lib/api/apiResponse'
import * as issuesService from './issues.service'

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
  const { title, description, creator, severity, department } = req.body

  // TODO: Validate input ...

  const createdIssue = issuesService.create({
    title,
    description,
    creator,
    severity,
    department,
  })

  // TODO: Sjekke server response
  const { success, error, data } = createdIssue
  if (!success) return Response(res).serverError(error)
  return Response(res).created(data)
}
