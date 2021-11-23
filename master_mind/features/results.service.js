import { Result } from '@/lib/api/result'
import * as resultsRepo from './results.repo'

//henter alle resultater fra databasen//
export const list = async () => {
  const { success, data, error } = await resultsRepo.findMany()
  if (!success) return Result.failure(error)
  return Result.success(data)
}

//legger til nytt resultat i databasen

export const create = async (result) => {
  //sjekker dataene som kommer //
  if (result.combination.length <= 0) {
    return Result.failure('Inneholder ikke gyldig spillkombinasjon')
  } else if (result.user.length <= 0) {
    return Result.failure('inneholder ikke gyldig brukernavn')
  } else if (result.numberOfTries === 0) {
    return Result.failure('Dette kan ikke stemme, null forsøk?')
  } else if (result.foundCombination != true || false) {
    Result.failure('foundCombination må være true eller false')
  }

  const createdResult = await resultsRepo.create(result)

  const { success, data, error } = createdResult
  if (!success) return Result.failure(error)

  return Result.success(data)
}
