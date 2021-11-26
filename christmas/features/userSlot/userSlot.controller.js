import { openSlot, getSuperBonusWinner } from './userSlot.service'
import { Response } from '@/lib/api/apiResponse'
import { userInfo } from '@/lib/utils/user'

export const open = async (req, res) => {
  const { id } = req.query
  const { user } = await userInfo(req)

  if (!id || !user)
    Response(res).badRequest('Missing required parameters: id, user')

  const { success, data, error } = await openSlot(id, user)

  if (!success) return Response(res).serverError(error)

  return Response(res).ok(data)
}

export const superbonus = async (req, res) => {
  const { id } = req.query
  const { admin } = await userInfo(req)

  if (!admin) return Response(res).forbidden()

  const { success, data, error } = await getSuperBonusWinner(id)

  if (!success) return Response(res).serverError(error)

  return Response(res).ok(data)
}
