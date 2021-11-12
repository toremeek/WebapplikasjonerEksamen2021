import { get } from './calender.repository'
import { Result } from '@/lib/api/result'

export const getCalender = async (name) => {
  const { success, data, error } = await get(name)

  if (!success) return Result.failure(error)
  if (!data) return Result.failure('Cannot find calender with name')

  return Result.success(data)
}
