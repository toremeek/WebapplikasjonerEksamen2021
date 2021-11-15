import { getFilterProps } from '@/features/filter/filter.controller'
import { Response } from '@/lib/api/apiResponse'

const handler = async (req, res) => {
  const { method } = req

  switch (method.toUpperCase()) {
    case 'GET':
      await getFilterProps(req, res)
      break
    default:
      Response(res).noContent()
  }
}

export default handler
