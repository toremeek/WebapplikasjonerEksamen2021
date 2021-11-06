import * as issuesRepository from './issues.repository'
import * as departmentRepository from '../departments/departments.repository'
import { Result } from '@/lib/api/result'

// Henter alle issues fra databasen
export const list = async () => await issuesRepository.findMany()

// Legg til ny issue i databasen
export const create = async (issueData) => {
  // Hva sendes inn fra front-end, department id eller value?
  const { title, description, creator, severity, department } = issueData

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
