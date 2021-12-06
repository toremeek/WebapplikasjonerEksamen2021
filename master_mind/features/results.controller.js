import * as resultsService from './results.service'
import { Response } from '@/lib/api/apiResponse'
import resultsCreateDto from './results.dto'
import { validate } from '@/lib/validation'

//Get - henter alle resultater //
// api/results
export const listResults = async (req, res) => {
  const results = await resultsService.list()
  const { success, error, data } = results

  if (!success) return Response(res).serverError(error)

  return Response(res).ok(data)
}

// post - lagre nytt resultat
// api/results

export const createResult = async (req, res) => {
  const result = req.body.stateData
  const combinationArray = result.combination.split(',')
  if (!validate.correctLength(4, combinationArray)) {
    return Response(res).serverError('Feil med data som sendes til db')
  } else {
    const newResult = await resultsService.create(resultsCreateDto(result))

    const { success, error, data } = newResult
    if (!success) return Response(res).serverError(error)

    return Response(res).created(data)
  }
}
