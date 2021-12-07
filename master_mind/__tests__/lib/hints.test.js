const { validate } = require('@/lib/validation')

//Tester det som sendes til api-et for å få tilbake hints

describe('Validation', () => {
  describe('When validating minLength', () => {
    it('should return false when length is not provided', () => {
      const hasNoMinLength = validate.correctLength(null, [
        'green',
        'red',
        'pink',
        'orange',
      ])
      expect(hasNoMinLength).toBeFalsy()
    })
    it('should return false when value is not provided', () => {
      const noValue = validate.correctLength(2)
      expect(noValue).toBeFalsy()
    })
    it('should return false when values is to short', () => {
      const shortValue = validate.correctLength(4, ['pink', 'grey'])
      expect(shortValue).toBeFalsy()
    })
    it('should return true when value and correct length is provded', () => {
      const correctValueAndLength = validate.correctLength(4, [
        'pink',
        'grey',
        'orange',
        'red',
      ])
      expect(correctValueAndLength).toBeTruthy()
    })
  })
})
