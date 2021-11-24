import * as departmentsRepository from './departments.repository'
import { Result } from '@/lib/api/result'

export const getName = async (departmentId) => {
  const { success, data, error } = await departmentsRepository.findOne(
    departmentId
  )

  if (!success) return Result.failure(error)
  if (!data)
    return Result.failure(`Department with id ${departmentId} does not exist`)

  return Result.success(data)
}
