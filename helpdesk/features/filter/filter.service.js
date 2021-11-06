import * as issuesRepository from '../issues/issues.repository'
import * as departmentsRepository from '../departments/departments.repository'

export const listIssuesWith = async (property) => {
  const issues = await issuesRepository.findManyWhere(property)

  if (!issues.success) return { success: false, error: issues.error }
  return { success: true, data: issues.data }
}
