// Hentet fra:
// https://xn--fullstkk-o0a.no/courses/next-final/02-konsistent-response/
export const Result = {
  success(data) {
    return { success: true, data }
  },
  failure(error) {
    return { success: false, error }
  },
}
