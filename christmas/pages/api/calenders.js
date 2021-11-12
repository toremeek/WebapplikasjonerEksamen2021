import { get } from '@/features/calender/calender.controller'
import { Response } from '@/lib/api/apiResponse'

const handler = async (req, res) => {
  const { method } = req

  switch (method.toUpperCase()) {
    case 'GET':
      await get(req, res)
      break
    default:
      Response(res).badRequest()
  }
}

export default handler
