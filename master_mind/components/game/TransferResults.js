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
    numberOfTries: state?.gameCounter.toString(),
    foundCombination: state?.foundCombination.toString(),
  }

  const shipToApi = async () => {
    const data = await axios.post('/api/results', { stateData })
    console.log(stateData)
    const response = await data?.data
    console.log(response)
  }
  useEffect(() => {
    shipToApi()
  })

  return <p>{JSON.stringify(state)}</p>
}

export default TransferResult
