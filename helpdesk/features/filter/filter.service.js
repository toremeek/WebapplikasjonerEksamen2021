import { issueGetDto } from '../issues/issues.dto'
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

  return Result.success(data.map((issue) => issueGetDto(issue)))
}
