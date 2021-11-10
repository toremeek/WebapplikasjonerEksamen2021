// Validerings kriterier
const TITLE_LENGTH = { min: 25, max: 150 }
const DESC_LENGTH = { min: 1, max: 250 }
const COMMENT_LENGTH = { min: 1, max: 250 }

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
    return (
      this.name(issue.creator) &&
      this.title(issue.title) &&
      this.description(issue.description) &&
      issue.severity &&
      issue.department
    )
  },
}

export default Validate
