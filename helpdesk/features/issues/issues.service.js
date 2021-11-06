import * as issuesRepository from './issues.repository'

// Henter alle issues fra databasen
export const list = async () => await issuesRepository.findMany()

// Legg til ny issue i databasen
export const create = async (issueData) => {
  // Hva sendes inn fra front-end, department id eller value?
  const { title, description, creator, severity, department } = issueData

  // Sjekker om department eksisterer i databasen
  const departmentId = await departmentRepository.exist(department)?.data?.id

  if (!departmentId)
    return {
      success: false,
      error: `Department '${department}' does not exist`,
    }

  // Sjekk om det finnes en issue med samme tittel, descripton og department.
  // For man kan ha samme issue men i en annen avdeling?
  const issue = await issuesRepository.exist({ title, description })
  // Server feiler
  if (!issue.success) return { success: false, error: issue.error }

  const createdIssue = await issuesRepository.create({
    ...issue,
    departmentId,
  })

  if (!createdIssue.success)
    return { success: false, error: createdIssue.error }

  return { success: true, data: createdIssue.data }
}
