// Hentet fra:
// https://xn--fullstkk-o0a.no/courses/next-final/02-konsistent-response/
export const Result = {
  success: (data) => ({ success: true, data }),
  failure: (error) => ({ success: false, error }),
}
