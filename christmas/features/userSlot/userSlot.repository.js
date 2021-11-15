import { DbError } from '@/lib/api/dbErrors'
import { Result } from '@/lib/api/result'
import prisma from '@/lib/clients/db'

export const create = async (slotId, userId, coupon) => {
  try {
    const userSlot = await prisma.userSlot.create({
      data: {
        coupon,
        slot: {
          connect: {
            id: slotId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })

    return Result.success(userSlot)
  } catch (error) {
    return Result.failure(DbError.create('userSlot', error))
  }
}

export const exists = async (slotId, userId) => {
  try {
    const userSlot = await prisma.userSlot.findFirst({
      where: {
        AND: [{ userId }, { slotId }],
      },
    })

    return Result.success(userSlot)
  } catch (error) {
    return Result.failure(DbError.read('userSlot', error))
  }
}
