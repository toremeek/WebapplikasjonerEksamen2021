import { DbError } from '@/lib/api/dbErrors'
import { Result } from '@/lib/api/result'
import prisma from '@/lib/clients/db'

export const getUserById = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: +userId },
    })

    return Result.success(user)
  } catch (error) {
    return Result.failure(DbError.read('user', error))
  }
}
