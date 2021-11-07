import { DbError } from '@/lib/api/dbErrors'
import { Result } from '@/lib/api/result'
import prisma from '@/lib/clients/db'

// Henter alle kommentarer til en issue
export const findMany = async (issueId) => {
  try {
    const comments = await prisma.comment.findMany({ where: { issueId } })

    return Result.success(comments)
  } catch (error) {
    return Result.failure(DbError.read('comment', undefined, error))
  }
}

// Legger til ny kommentar til en issue
export const create = async ({ comment, issueId }) => {
  try {
    const newComment = await prisma.comment.create({
      data: {
        comment,
        issue: {
          connect: {
            id: issueId,
          },
        },
      },
    })

    return Result.success(newComment)
  } catch (error) {
    return Result.failure(DbError.create('comment', undefined, error))
  }
}
