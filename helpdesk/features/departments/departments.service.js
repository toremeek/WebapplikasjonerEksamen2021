import * as departmentsRepository from './departments.repository'
import * as issuesRepository from '../issues/issues.repository'

export const getIssueComments = async (issueId) => {
  const issue = await issuesRepository.exist(issueId)

  if (!issue.success) return { success: false, error: issue.error }
  if (!issue.data)
    return { success: false, error: `Issue with id ${id} does not exist` }

  const comments = await departmentsRepository()
}
