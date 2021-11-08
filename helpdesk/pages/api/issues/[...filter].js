import * as filterController from '@/features/filter/filter.controller'
import { Response } from '@/lib/api/apiResponse'

// api/issues/{...fliter}
// Spørsmål: Endre dette til /api/issues/filter?quer=prop&value=value
const handler = async (req, res) => {
  const { method } = req

  switch (method?.toUpperCase()) {
    case 'GET':
      // Returnerer filtrerte issues
      await filterController.filterIssues(req, res)
      break
    default:
      return Response(res).badRequest()
  }
}

export default handler
