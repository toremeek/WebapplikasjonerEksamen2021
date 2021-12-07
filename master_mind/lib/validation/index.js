export const validate = {
  correctLength(length, value) {
    if (length && value?.length === length) return true
    return false
  },
}
