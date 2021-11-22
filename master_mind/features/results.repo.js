import { DbError } from '@/lib/api/dbError'
import { Result } from '@/lib/api/result'
import prisma from '@/lib/clients/db'

// DENNE FILEN SNAKKER DIREKTE MED DATABASEN

//henter alle resultater fra databasen
export const findMany = async () => {
  try {
    const results = await prisma.game.findMany()
    console.log('alle resultater fra repo', results)
    return Result.success(results)
  } catch (error) {
    return Result.failure(DbError.read('results', undefined, error))
  }
}

// lager et nytt resultat
//result må inneholde combination, user, numberOfTries, foundCombination (boolean) //
export const create = async (result) => {
  try {
    const newResult = await prisma.game.create({
      data: {
        ...result,
      },
    })
    console.log('nytt resultat fra repo', newResult)
    return Result.success(newResult)
  } catch (error) {
    return Result.failure(DbError.create('result', undefined, error))
  }

  {
  }
}
