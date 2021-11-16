import { DbError } from '@/lib/api/dbErrors'
import { Result } from '@/lib/api/result'
import prisma from '@/lib/clients/db'

export const get = async (name) => {
  try {
    const calender = await prisma.calender.findUnique({
      where: {
        name,
      },
      include: {
        slot: true,
      },
    })

    return Result.success(calender)
  } catch (error) {
    return Result.failure(DbError.read('calender', error))
  }
}

export const getUsersCalendar = async (name, userId) => {
  try {
    const calender = await prisma.calender.findUnique({
      where: {
        name,
      },
      include: {
        slot: {
          select: {
            id: true,
            slug: true,
            order: true,
            createdAt: true,
            openAt: true,
            userSlots: {
              where: {
                userId,
              },
            },
          },
        },
      },
    })

    return Result.success(calender)
  } catch (error) {
    return Result.failure(DbError.read('calender', error))
  }
}
