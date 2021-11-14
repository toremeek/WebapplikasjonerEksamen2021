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
    return Result.failure(error.code)
  }
}
