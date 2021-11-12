import { getCalender } from './calender.service'
import { Response } from '@/lib/api/apiResponse'

export const get = async (req, res) => {
  const { name } = req.query

  if (!name) Response(res).badRequest('Missing required parameters: name')

  const { success, data, error } = await getCalender(name)

  if (!success) return Response(res).serverError(error)

  return Response(res).ok(data)
}
