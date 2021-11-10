import * as departmentRepository from '../departments/departments.repository'
import * as issuesRepository from './issues.repository'
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
  const { issue, department } = issueData

  // Sjekker om department eksisterer i databasen
  const departmentFromDb = await departmentRepository.findOneByName(department)
  const departmentId = departmentFromDb.data?.id

  if (!departmentId)
    return Result.failure(`Department '${department}' does not exist`)

  // Sjekk om det finnes en issue med samme tittel
  const duplicateIssue = await issuesRepository.exist({ title: issue.title })

  if (!duplicateIssue.success) return Result.failure(duplicateIssue.error)

  const createdIssue = await issuesRepository.create(issue, departmentId)

  const { success, data, error } = createdIssue

  if (!success) return Result.failure(error)

  return Result.success(data)
}

// Merke issue som løst / resovled
export const resolve = async (id) => {
  // Henter issue med id fra databasen
  const issue = await issuesRepository.exist({ id })

  // Sjekker om issue eksistere og om den er uløst
  if (!issue.success) return Result.failure(issue.error)
  if (!issue.data) return Result.failure(`Cannot find issue: ${id}`)
  if (issue.data.isResolved)
    return Result.failure('Issue is allready resolved!')

  const { success, data, error } = await issuesRepository.resolve(id)

  if (!success) return Result.failure(error)

  return Result.success(data)
}
