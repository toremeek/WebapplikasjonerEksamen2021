import * as resultsService from './results.service'
import { Response } from '@/lib/api/apiResponse'
import resultsCreateDto from './results.dto'

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
  console.log('dette mottar api-et i req.body', req.body)
  //fra req.body : combination, user, numberOfTries, foundCombination (boolean) //
  //TODO: validering av req-body
  const newResult = await resultsService.create(resultsCreateDto(req.body))
  const { succcess, error, data } = newResult
  if (!succcess) return Response(res).serverError(error)
  return Response(res).created(data)
}
