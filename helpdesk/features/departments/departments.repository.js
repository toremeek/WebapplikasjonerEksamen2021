import { DbError } from '@/lib/api/dbErrors'
import { Result } from '@/lib/api/result'
import prisma from '@/lib/clients/db'

// Henter alle -- BRUKES IKKE !!
export const findMany = async () => {
  try {
    const departments = await prisma.department.findMany()

    return Result.success(departments)
  } catch (error) {
    return Result.failure(DbError('department', undefined, error))
  }
}

// Henter avdeling med id -- BRUKES IKKE !!
export const findOne = async (id) => {
  try {
    const department = await prisma.department.findUnique({ where: { id } })

    return Result.success(department)
  } catch (error) {
    return Result.failure(DbError('department', undefined, error))
  }
}

// Henter avdeling id fra navn
export const findOneByName = async (name) => {
  try {
    const department = await prisma.department.findUnique({ where: { name } })

    return Result.success(department)
  } catch (error) {
    return Result.failure(DbError('department', undefined, error))
  }
}
