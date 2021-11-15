import { userCalender } from './calender.dto'
import { get, getUsersCalendar } from './calender.repository'
import { Result } from '@/lib/api/result'

export const getCalender = async (name, user) => {
  const { id } = user || ''

  const result = id ? await getUsersCalendar(name, id) : await get(name)

  const { success, data, error } = result

  if (!success) return Result.failure(error)
  if (!data) return Result.failure('Cannot find calender with name')

  return Result.success(userCalender(data))
}
