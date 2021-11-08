import * as issuesRepository from './issues.repository'
import * as departmentRepository from '../departments/departments.repository'
import { Result } from '@/lib/api/result'

// Henter alle issues fra databasen
export const list = async () => {
  const { success, data, error } = await issuesRepository.findMany()
  if (!success) return Result.failure(error)
  return Result.success(data)
}

// Henter en issue med kommentarer
export const getIssueExtended = async (issueId) => {
  const { success, data, error } = await issuesRepository.findOne(issueId)
  if (!success) return Result.failure(error)
  return Result.success(data)
}

// Legg til ny issue i databasen
export const create = async (issueData) => {
  const { title, department } = issueData

  // Sjekker om department eksisterer i databasen
  const departmentFromDb = await departmentRepository.findOneByName(department)
  const departmentId = departmentFromDb.data?.id

  if (!departmentId)
    return Result.failure(`Department '${department}' does not exist`)

  // Sjekk om det finnes en issue med samme tittel
  const issue = await issuesRepository.exist({ title })
  if (!issue.success) return Result.failure(issue.error)

  const createdIssue = await issuesRepository.create({
    ...issueData,
    departmentId,
  })

  const { success, data, error } = createdIssue
  if (!success) return Result.failure(error)
  return Result.success(data)
}
