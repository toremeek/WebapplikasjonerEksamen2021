import { DbError } from '@/lib/api/dbErrors'
import { Result } from '@/lib/api/result'
import prisma from '@/lib/clients/db'

export const getSlotById = async (slotId) => {
  try {
    const slot = await prisma.slot.findUnique({
      where: { id: +slotId },
    })

    return Result.success(slot)
  } catch (error) {
    return Result.failure(DbError.read('slot', error))
  }
}
