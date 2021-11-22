import { userCalender } from './calender.dto'
import {
  get,
  getCalenderWithAllUsers,
  getUsersCalendar,
} from './calender.repository'
import { Result } from '@/lib/api/result'

export const getCalender = async (name, user) => {
  const result = user?.id
    ? await getUsersCalendar(name, user.id)
    : await get(name)

  const { success, data, error } = result

  if (!success) return Result.failure(error)
  if (!data) return Result.failure('Cannot find calender with name')

  return Result.success(userCalender(data))
  // return Result.success(data)
}

export const getAdminCalender = async (name) => {
  const { success, data, error } = await getCalenderWithAllUsers(name)

  if (!success) return Result.failure(error)
  if (!data) return Result.failure('Cannot find calender with name')

  return Result.success(data)
  // return Result.success(userCalender(data))
}
