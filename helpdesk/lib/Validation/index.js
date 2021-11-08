//valideringsbjekt som returnerer true om betingelsen oppfylles, ellers false //

export const validate = {
  minLength(length, value) {
    if (length && value?.length >= length) {
      return true
    } else {
      return false
    }
  },

  maxLength(length, value) {
    if (length && value?.length <= length) {
      return true
    } else {
      return false
    }
  },
  minMaxLength(min, max, value) {
    if (value?.length >= min && value?.length <= max) {
      return true
    } else {
      return false
    }
  },
  nameCheck(value) {
    // const checkWhiteSpace = new RegExp("\\s+");
    const names = value.split(/\s+/)
    // if(checkWhiteSpace.test(value)){
    if (names.length > 1) {
      return value
        .split(' ')
        .filter(Boolean)
        .every((s) => s[0].toUpperCase() === s[0])
    } else {
      false
    }
  },
}
