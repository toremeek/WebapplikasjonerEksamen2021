export const validate = (value) => ({
  isMinLength: (length) => length && value?.length >= length,
  isMaxLength: (length) => length && value?.length <= length,
  isEmail: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value),
})
