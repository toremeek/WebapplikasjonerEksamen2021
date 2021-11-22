import { Result } from '@/lib/api/result'
import * as resultsRepo from './results.repo'

//henter alle resultater fra databasen//
export const list = async () => {
  const { success, data, error } = await resultsRepo.findMany()
  if (!success) return Result.failure(error)
  return Result.success(data)
}

//legger til nytt resultat i databasen

//TODO: mulig feilkilde her kan være if-sjekkene, spes bool-sjekken
export const create = async (result) => {
  console.log('dataene som kommer til servicen', result)
  const { combination, user, numberOfTries, foundCombination } = result

  //sjekker de ulike verdiene som skal vi dere til repo //
  if (combination.length <= 0) {
    return Result.failure('Inneholder ikke gyldig spillkombinasjon')
  } else if (user.length <= 0) {
    return Result.failure('inneholder ikke gyldig brukernavn')
  } else if (numberOfTries === 0) {
    return Result.failure('Dette kan ikke stemme, null forsøk?')
  } else if (foundCombination != true || false) {
    Result.failure('foundCombination må være true eller false')
  }
  const createdResult = await resultsRepo.create(result)
  const { succes, data, error } = createdResult
  if (!succes) return Result.failure(error)
  return Result.success(data)
}
