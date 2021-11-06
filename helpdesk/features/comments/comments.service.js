import * as commentsRepository from './comments.repository'
import * as issuesRepository from '../issues/issues.repository'

export const getIssueComments = async (id) => {
  // Sjekker om issue med id finnes
  const issue = await issuesRepository.exist({ id })

  if (!issue.success) return { success: false, error: issue.error }
  if (!issue.data)
    return { success: false, error: `Issue with id ${id} does not exist` }

  // Henter kommentarer knyttet til issue
  const comments = await commentsRepository.findMany(id)

  if (!comments.success) return { success: false, error: comments.error }

  return { success: true, data: comments.data }
}
