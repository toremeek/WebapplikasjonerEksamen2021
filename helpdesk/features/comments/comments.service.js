import * as issuesRepository from '../issues/issues.repository'
import * as commentsRepository from './comments.repository'
import { Result } from '@/lib/api/result'

// Sjekker om issueId tilhører en issue i databasen
const isValidIssue = async (id) => {
  const issue = await issuesRepository.exist({ id })

  const { success, data, error } = issue

  if (!success) return Result.failure(error)
  if (!data) return Result.failure(`Issue with id ${id} does not exist 💩`)

  return Result.success(data)
}

// Henter alle kommentarer tilhørende issue med {id}
export const getIssueComments = async (id) => {
  // Sjekker om issue med id finnes
  const validateIssue = await isValidIssue(id)

  if (!validateIssue.success) return validateIssue

  // Henter kommentarer knyttet til issue
  const { success, data, error } = await commentsRepository.findMany(id)

  if (!success) return Result.failure(error)

  return Result.success(data)
}

// Legger til kommentar til issue med {id}
export const add = async (properties) => {
  const { comment, id: issueId } = properties
  // Sjekker om issue med id finnes
  const validateIssue = await isValidIssue(issueId)

  if (!validateIssue.success) return validateIssue

  const { success, data, error } = await commentsRepository.create({
    comment,
    issueId,
  })

  if (!success) return Result.failure(error)

  return Result.success(data)
}
