import { openSlot } from './userSlot.service'
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
