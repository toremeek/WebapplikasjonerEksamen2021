import * as issuesRepository from '../issues/issues.repository'
import { Result } from '@/lib/api/result'

export const listIssuesWith = async (property) => {
  const issues = await issuesRepository.findManyWhere(property)

  const { success, data, error } = issues
  if (!success) return Result.failure(error)
  return Result.success(data)
}
