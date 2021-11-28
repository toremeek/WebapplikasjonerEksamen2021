import axios from 'axios'
import { useEffect } from 'react'

const { useGameContext } = require('@/contexts/game-context')

// sender staten til api-et for registrering når spillet er avsluttet //
const TransferResult = () => {
  const { state, dispatch } = useGameContext()

  //lager objekt av state-data som skal sendes til databasen //
  const stateData = {
    combination: state?.game.toString(),
    user: state?.user,
    numberOfTries: state?.gameCounter,
    foundCombination: state?.foundCombination,
  }

  const shipToApi = async () => {
    try {
      const data = await axios.post('http://localhost:3000/api/results', {
        stateData,
      })
      const response = await data?.data
      if (response?.success) {
        dispatch({
          type: 'set_transferStatus',
          payload: 'Suksess, ditt spill er lagret',
        })
      }
      //Får en melding i node-terminalen at svaret fra /api/results overskrider 4MB, men antar det har noe å gjøre med hvordan siden refreshes for å nullstille global state slik at spillet starter på nytt//
    } catch (error) {
      dispatch({
        type: 'set_transferStatus',
        payload: `Noe feilet under sending: ${error}`,
      })

      console.log('noe gikk galt', error)
    }
  }
  const replay = () => {
    window.location.reload()
  }

  useEffect(() => {
    shipToApi()
  })

  //Når siden refreshes med replay() kjører denne komponenten et kort sekund før global state nullstilles. Det fører til at api-sendingen i denne komponenten feiler og at man ser en feilmelding et kvart sekund før selve siden refreshes//
  return (
    <>
      <div>
        <p id="shipMessage">{state.transferStatus}</p>
        <button type="button" className="startButton" onClick={replay}>
          Spill igjen
        </button>
      </div>
    </>
  )
}

export default TransferResult
