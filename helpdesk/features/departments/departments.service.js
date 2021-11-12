import { Result } from '@/lib/api/result'
import * as departmentsRepository from './departments.repository'

export const getName = async (departmentId) => {
  const department = await departmentsRepository.findOne(departmentId)

  const { success, data, error } = department
  if (!success) return Result.failure(error)
  if (!data) return Result.failure(`Department with id ${id} does not exist`)

  return Result.success(data)
}
