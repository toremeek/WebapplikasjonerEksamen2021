import * as issuesService from './issues.service'

// GET
// /api/issues
export const listIssues = async (req, res) => {
  const issues = await issuesService.list()

  if (issues.error) return res.status(500).json(issues.error)
  return res.status(200).json(issues)
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
  if (!createdIssue.success)
    return res.status(500).json({ success: false, error: createdIssue.error })

  return res.status(201).json(createdIssue)
}
