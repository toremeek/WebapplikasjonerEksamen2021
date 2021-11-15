import { getCalender } from './calender.service'
import { Response } from '@/lib/api/apiResponse'
import { userInfo } from '@/lib/utils/user'

export const get = async (req, res) => {
  const { name } = req.query
  const { user, admin: isAdmin } = await userInfo(req)

  if (!name) Response(res).badRequest('Missing required parameters: name')

  console.log('getCalender: ', user, isAdmin)

  const { success, data, error } = await getCalender(name, user)

  if (!success) return Response(res).serverError(error)

  return Response(res).ok(data)
}
