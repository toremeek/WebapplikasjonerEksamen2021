import axios from 'axios'
import { useEffect } from 'react'

const { useGameContext } = require('@/contexts/game-context')

// sender staten til api-et for registrering når spillet er avsluttet //
const TransferResult = () => {
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
      return response?.success
    } catch (error) {
      console.log('noe gikk galt', error)
    }
  }
  const replay = () => {
    window.location.reload()
  }

  useEffect(() => {
    shipToApi()
  })

  return (
    <>
      <div>
        <p>Ditt resultat er lagret</p>
        <button type="button" className="startButton" onClick={replay}>
          Spill igjen
        </button>
      </div>
    </>
  )
}

export default TransferResult
