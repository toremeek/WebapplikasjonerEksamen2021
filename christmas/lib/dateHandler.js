// Konverterer millisekunder til dager
const msToDays = (ms) => ms / (1000 * 60 * 60 * 24)

// 2021-11-07T11:00:00.000Z -> 07.11.2021
export const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString()

// Antall hele dager frem til dato, negativ hvis dato er passert.
export const daysUntil = (dateString) =>
  Math.ceil(msToDays(new Date(dateString) - new Date()))

// Returnerer true / false om dato er passert
export const isTimePassed = (dateString) => daysUntil(dateString) <= 0
