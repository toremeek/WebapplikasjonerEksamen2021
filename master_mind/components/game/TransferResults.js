import axios from 'axios'
import { useEffect, useState } from 'react'

const { useGameContext } = require('@/contexts/game-context')

// sender staten til api-et for registrering når spillet er avsluttet //
const TransferResult = () => {
  const [success, setSucces] = useState(false)
  const { state } = useGameContext()
  //lager objekt av state-data som skal sendes til databasen //
  const stateData = {
    combination: state?.game.toString(),
    user: state?.user,
    numberOfTries: state?.gameCounter,
    foundCombination: state?.foundCombination,
  }

  const shipToApi = async () => {
    try {
      const data = await axios.post('/api/results', { stateData })
      const response = await data?.data
      if (response.success) {
        setSucces(true)
      }
    } catch (error) {
      console.log('noe gikk galt', error)
    }
  }
  useEffect(() => {
    shipToApi()
  })

  return (
    <>
      {success ? (
        <p>Ditt resultat har blitt lagret</p>
      ) : (
        <p>Noe gikk galt. Skyld på Marius :-) </p>
      )}
    </>
  )
}

export default TransferResult
