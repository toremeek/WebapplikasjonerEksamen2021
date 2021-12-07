import { Result } from './result'

// kilde: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

export const Response = (res) => ({
  // 200 - OK: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200
  ok: (data) => res.status(200).json(Result.success(data)),

  // 201 - Created: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
  created: (data) => res.status(201).json(Result.success(data)),

  // 204 - No Content: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204
  noContent: () => res.status(204).end(),

  // 400 - Bad Request: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400
  badRequest: (error = 'Bad request 💀') =>
    res.status(400).json(Result.failure(error)),

  // 409 - Conflict: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409
  conflict: (error = 'Ressursen finnes allerede') =>
    res.status(409).json(Result.failure(error)),

  // 500 - Server Error: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500
  serverError: (error = 'Forespørselen feilet') =>
    res.status(500).json(Result.failure(error)),
})
