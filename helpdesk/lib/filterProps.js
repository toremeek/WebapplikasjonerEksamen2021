export const filterProps = {
  departments: {
    type: 'department',
    defaultText: 'Avdeling',
    list: ['IT', 'Design', 'Salg'],
    // Brukes av filter prop
    getValues: function () {
      return this.list.map((item) => ({ value: item, text: item }))
    },
  },

  severity: {
    type: 'severity',
    defaultText: 'Viktighet',
    list: [
      { value: 1, text: 'Lav' },
      { value: 2, text: 'Medium' },
      { value: 3, text: 'Høy' },
    ],
    // Brukes av filter prop
    getValues: function () {
      return this.list
    },
  },
}
