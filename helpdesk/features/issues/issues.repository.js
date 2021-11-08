import { DbError } from '@/lib/api/dbErrors'
import { Result } from '@/lib/api/result'
import prisma from '@/lib/clients/db'
import * as departmentRepository from '@/features/departments/departments.repository'

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

// Henter alle issues med property lik ...
// Department / severity
// TODO: Fikse innviklet logikk - splitte opp i to funksjoner?
export const findManyWhere = async (property) => {
  let { resource, value } = property
  if (resource === 'department') {
    const departmentInfo = await departmentRepository.findOneByName(value)
    if (!departmentInfo.success)
      return Result.failure(DbError.read('department', undefined, error))

    resource = 'departmentId'
    value = departmentInfo.data?.id
  } else value = +value

  try {
    const issues = await prisma.issue.findMany({
      where: {
        [resource]: value,
      },
    })

    return Result.success(issues)
  } catch (error) {
    return Result.failure(DbError.read('issues', undefined, error))
  }
}

// Legger til ny issue
export const create = async (issue) => {
  try {
    const { departmentId } = issue
    // Fjerner props som ikke skal inn i db
    delete issue.departmentId
    delete issue.department

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
