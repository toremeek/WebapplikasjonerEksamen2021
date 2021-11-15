import { DbError } from '@/lib/api/dbErrors'
import { Result } from '@/lib/api/result'
import prisma from '@/lib/clients/db'

// Henter alle issues fra databasen
export const findMany = async () => {
  try {
    const issues = await prisma.issue.findMany({
      include: {
        department: { select: { name: true } },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    })

    return Result.success(issues)
  } catch (error) {
    return Result.failure(DbError.read('issues', undefined, error))
  }
}

// Henter en issue med kommentarer
export const findOne = async (issueId) => {
  try {
    const issue = await prisma.issue.findUnique({
      where: {
        id: issueId,
      },
      include: {
        department: { select: { name: true } },
        comments: true,
      },
    })

    return Result.success(issue)
  } catch (error) {
    return Result.failure(DbError.read('issues', undefined, error))
  }
}

// Henter alle issues med property lik ...
export const findManyWhere = async (property, value) => {
  try {
    const issues = await prisma.issue.findMany({
      where: {
        [property]: value,
      },
      include: {
        department: { select: { name: true } },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    })

    return Result.success(issues)
  } catch (error) {
    return Result.failure(DbError.read('issues', undefined, error))
  }
}

// Legger til ny issue
export const create = async (issue, departmentId) => {
  try {
    const newIssue = await prisma.issue.create({
      data: {
        ...issue,
        department: {
          connect: {
            id: departmentId,
          },
        },
      },
    })

    return Result.success(newIssue)
  } catch (error) {
    return Result.failure(DbError.create('issue', undefined, error))
  }
}

// Sjekker om issue med 'identifier' finnes i databasen
export const exist = async (identifier) => {
  try {
    const issue = await prisma.issue.findUnique({
      where: { ...identifier },
    })

    return Result.success(issue)
  } catch (error) {
    return Result.failure(DbError.read('issue', undefined, error))
  }
}

// Oppdaterer issue med {id} til isResolved = true
export const resolve = async (issueId) => {
  try {
    const issue = await prisma.issue.update({
      where: { id: issueId },
      data: { isResolved: true },
    })

    return Result.success(issue)
  } catch (error) {
    return Result.failure(DbError.update('issue', undefined, error))
  }
}
