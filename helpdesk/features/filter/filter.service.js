import * as issuesRepository from '../issues/issues.repository'
import * as departmentRepository from '@/features/departments/departments.repository'
import { Result } from '@/lib/api/result'

export const listIssuesWith = async (property) => {
  const { resource, value } = property
  let result

  switch (resource) {
    // Filtrerer issues etter department
    case 'department': {
      const departmentInfo = await departmentRepository.findOneByName(value)

      if (!departmentInfo.success || !departmentInfo.data)
        return Result.failure('Cannot find department')

      result = await issuesRepository.findManyWhere(
        'departmentId',
        departmentInfo.data?.id
      )
      break
    }
    // Filtrerer issues etter severity
    case 'severity':
      if (Number.isNaN(value))
        return Result.failure('Missing required field: severity')

      result = await issuesRepository.findManyWhere(resource, +value)
      break
    default:
      return Result.failure('Incorrect resource')
  }

  const { success, data, error } = result

  if (!success) return Result.failure(error)

  return Result.success(data)
}

// TODO: Brukes ikke?? Ta bort
export const filterProps = async () => {
  const { success, data } = await departmentRepository.findMany()

  if (!success) return Result.failure('Failed finding departments')
  const departments = data.map((dep) => dep.name)

  return Result.success({
    departments,
    severity: [{ 1: 'Lav', 2: 'Middels', 3: 'Høy' }],
  })
}
