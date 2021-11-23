/* eslint-disable no-param-reassign */
/* eslint-disable no-ternary */
import { useCallback, useState } from 'react'

import ColorPicker from './ColorPicker'
import Row from './Row'
import Solution from './Solution'
import { useGameContext } from '@/contexts/game-context'
import axios from 'axios'
import TransferResult from './TransferResults'

const Rows = () => {
  const { state, dispatch } = useGameContext()
  const isCurrentRow = useCallback(
    (rowNumber) => {
      return rowNumber === state?.currentRow
    },
    [state.currentRow]
  )

  //sender kopi av state til apiet og får hints og color tilbake //
  const handleRowSubmit = async (event) => {
    event.preventDefault()
    console.log(state.game)
    //øker counteren for hvert forsøk, lagrer verdien i state //
    dispatch({
      type: 'increment_counter',
    })
    try {
      const dataToApi = { ...state }
      const sendData = await axios.post('/api/hints', { dataToApi })
      const receivedData = await sendData?.data
      const hints = receivedData.data
      //  Sjekker om spillet er løst basert på hints fra api-et og setter hint //
      dispatch({ type: 'set_hints', payload: { hints } })
      if (hints?.positions === 4) {
        dispatch({ type: 'set_complete' })
      } else {
        dispatch({ type: 'increase_row' })
      }
    } catch (error) {
      console.log('noe gikk galt', error)
    }
  }

  const handleCellClick = (event) => {
    const { cell } = event.currentTarget.dataset

    if (state.currentColor) {
      dispatch({ type: 'set_row_colors', payload: { cell } })
    }
  }

  const handleSelectedColor = async (color) => {
    if (state?.currentColor === color) {
      dispatch({ type: 'reset_picked_color' })
    } else {
      dispatch({ type: 'picked_color', payload: { color } })
    }
  }

  return (
    <>
      <div className="rows">
        {state?.isComplete ? (
          <>
            <Solution
              row={state.rows[state.currentRow]}
              foundCombination={state?.foundCombination}
            />
            <TransferResult />
          </>
        ) : null}
        {!state?.isComplete &&
          state?.rows?.map((row) => (
            <div className="row-wrapper" key={row?.name}>
              <form onSubmit={handleRowSubmit}>
                <div
                  style={{
                    opacity: isCurrentRow(row?.number) ? 1 : 0.2,
                    pointerEvents: !isCurrentRow(row?.number) ? 'none' : 'auto',
                  }}
                >
                  <Row
                    name={row?.name}
                    number={row?.number}
                    hints={row?.hints}
                    pegs={row?.pegs}
                    cells={row?.cells}
                    handleCellClick={handleCellClick}
                  />
                  <button
                    disabled={state.selectedColors.length !== 4}
                    className=""
                    type="submit"
                  >
                    Send
                  </button>
                </div>
              </form>
              {isCurrentRow(row?.number) ? (
                <ColorPicker
                  colors={state?.remaningColors}
                  selectedColor={state?.currentColor}
                  handleSelectedColor={handleSelectedColor}
                />
              ) : null}
            </div>
          ))}
      </div>
    </>
  )
}

export default Rows
