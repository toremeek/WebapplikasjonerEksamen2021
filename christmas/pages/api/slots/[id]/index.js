import { open } from '@/features/userSlot/userSlot.controller'
import { Response } from '@/lib/api/apiResponse'

const handler = async (req, res) => {
  const { method } = req

  switch (method.toUpperCase()) {
    case 'PUT':
      await open(req, res)
      break
    default:
      Response(res).badRequest()
      break
  }
}

export default handler
