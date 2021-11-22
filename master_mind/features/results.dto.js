//TODO: mulig feilkilde her er at jeg bruker navnene på verdiene som kommer fra state, men som heter
//noe annet i tabellen. Må evt endre navnene i tabellene slik at de stemmer med hva som står i
//state

const resultsCreateDto = ({ foundCombination, user, gameCounter, game }) => ({
  result: {
    game,
    user,
    gameCounter,
    foundCombination,
  },
})

export default resultsCreateDto
