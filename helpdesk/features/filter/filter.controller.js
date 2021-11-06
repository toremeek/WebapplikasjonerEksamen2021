import { Response } from '@/lib/api/apiResponse'
import { listIssuesWith } from './filter.service'

// TODO: Finne en bedre løsning?
const filterProperties = ['department', 'severity']
const isValidProperty = (property) => filterProperties.includes(property)

// GET
// api/issues/{resource}/{value}
export const filterIssues = async (req, res) => {
  const {
    filter: [resource, value],
  } = req.query

  // Sjekker om vi har en verdi og gyldig property å filtrere med
  if (!value || !isValidProperty(resource)) return Response(res).badRequest()
  const result = await listIssuesWith({ resource, value })

  const { success, data, error } = result
  if (!success) return Response(res).serverError(error)
  return Response(res).ok(data)
}
