import { Result } from '@/lib/api/result'
import prisma from '@/lib/clients/db'

export const getSlotById = async (slotId) => {
  console.log('ID: ', slotId)
  // TODO: Hvorfor får jeg problemer med string id??
  try {
    const slot = await prisma.slot.findUnique({
      where: { id: +slotId },
    })

    return Result.success(slot)
  } catch (error) {
    return Result.failure(error.code)
  }
}
