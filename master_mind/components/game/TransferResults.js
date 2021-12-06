import { validate } from '@/lib/validation'
import axios from 'axios'

const { useGameContext } = require('@/contexts/game-context')

// sender spillinfo til api-et for registrering når spillet er avsluttet //
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
        //resetter spillet ved å trigge reload av siden etter at resultatet er mottatt av api-et.
        window.location.reload()
      }
    } catch (error) {
      dispatch({
        type: 'set_transferStatus',
        payload: `Noe feilet under sending: ${error}`,
      })

      console.log('noe gikk galt', error)
    }
  }

  return (
    <>
      <div>
        <p id="shipMessage">{state.transferStatus}</p>
        <button type="button" className="startButton" onClick={shipToApi}>
          Spill igjen
        </button>
      </div>
    </>
  )
}

export default TransferResult
