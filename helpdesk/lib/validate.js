// Validerings kriterier
const TITLE_LENGTH = { min: 25, max: 150 }
const DESC_LENGTH = { min: 5, max: 250 }
const COMMENT_LENGTH = { min: 5, max: 250 }

// Validerings beskjeder
const VALIDATION_ERROR_MESSAGES = {
  name: 'For og etternavn må ha stor forbokstav og mellomrom',
  title: `Tittel må fylles ut, min ${TITLE_LENGTH.min} og maks ${TITLE_LENGTH.max} tegn`,
  desciption: `Beskrivelse må fylles ut, min ${DESC_LENGTH.min} tegn og maks ${DESC_LENGTH.max} tegn`,
  severity: 'Viktighet må velges',
  department: 'Avdeling må velges',
}

// Funksjoner for å sjekke lengde på strenger
const isMinLength = (length, string) => length && string?.length >= length
const isMaxLength = (length, string) => length && string?.length <= length
const isLengthBetweenMinAndMax = ({ min, max }, value) =>
  isMinLength(min, value) && isMaxLength(max, value)

// Funksjon for å sjekke navn
const hasNameCapitalFirstLetter = (value) =>
  value.split(' ').every((word) => word[0].toUpperCase() === word[0])
const hasFirstAndLastName = (value) => value.split(' ').length > 1

const Validate = {
  // Navn: Fornavn og Etternavn, stor forbokstav
  name(name) {
    return hasFirstAndLastName(name) && hasNameCapitalFirstLetter(name)
  },

  // Title: min 25 max 150
  title(title) {
    return isLengthBetweenMinAndMax(TITLE_LENGTH, title)
  },

  // Description: required (over 1 bokstav?) max 250
  description(desc) {
    return isLengthBetweenMinAndMax(DESC_LENGTH, desc)
  },

  // Comments: max 250
  comment(comment) {
    return isLengthBetweenMinAndMax(COMMENT_LENGTH, comment)
  },

  // Issue: Sjekker tile, desc osv..
  issue(issue) {
    const isValidFields = {
      name: this.name(issue.creator),
      title: this.title(issue.title),
      desciption: this.description(issue.description),
      severity: Boolean(issue.severity),
      department: Boolean(issue.department),
    }

    if (Object.values(isValidFields).every(Boolean)) return { isValid: true }
    const notValidFields = Object.keys(isValidFields).filter(
      (i) => !isValidFields[i]
    )

    return {
      isValid: false,
      issues: notValidFields.map((key) => VALIDATION_ERROR_MESSAGES[key]),
    }
  },
}

export default Validate
