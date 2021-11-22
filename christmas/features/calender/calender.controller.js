import { getCalender, getAdminCalender } from './calender.service'
import { Response } from '@/lib/api/apiResponse'
import { userInfo } from '@/lib/utils/user'

export const get = async (req, res) => {
  const { name } = req.query
  const { user } = await userInfo(req)

  if (!name) Response(res).badRequest('Missing required parameters: name')

  const { success, data, error } = await getCalender(name, user)

  if (!success) return Response(res).serverError(error)

  return Response(res).ok(data)
}

export const getDashboard = async (req, res) => {
  const { name } = req.query
  const { admin } = await userInfo(req)

  if (!name) Response(res).badRequest('Missing required parameters: name')
  if (!admin) Response(res).forbidden()

  const { success, data, error } = await getAdminCalender(name)

  if (!success) return Response(res).serverError(error)

  return Response(res).ok(data)
}
