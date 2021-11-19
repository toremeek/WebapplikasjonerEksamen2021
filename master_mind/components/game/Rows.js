/* eslint-disable no-param-reassign */
/* eslint-disable no-ternary */
import { useCallback, useState } from 'react'

import ColorPicker from './ColorPicker'
import Row from './Row'
import Solution from './Solution'
import { useGameContext } from '@/contexts/game-context'
import axios from 'axios'
import { getUserFromCookie } from '@/lib/utils/api'

const Rows = () => {
  const { state, dispatch } = useGameContext()

  const isCurrentRow = useCallback(
    (rowNumber) => {
      return rowNumber === state?.currentRow
    },
    [state.currentRow]
  )

  const setUser = async () => {
    const user = await getUserFromCookie()
    if (user?.length > 0) {
      console.log(user)
      dispatch({
        type: 'set_user',
        payload: user,
      })
    }
  }

  //sender kopi av state til apiet og får hints og color tilbake //
  const handleRowSubmit = async (event) => {
    event.preventDefault()

    try {
      const dataToApi = { ...state }
      console.log(dataToApi)
      const sendData = await axios.post('/api/hints', { dataToApi })
      const receivedData = await sendData?.data
      console.log('mottak', receivedData)
      const hints = receivedData.data

      //øker counteren for hvert forsøk, lagrer verdien i state //
      dispatch({
        type: 'increment_counter',
      })
      dispatch({ type: 'set_hints', payload: { hints } })
      if (hints?.positions === 4) {
        dispatch({ type: 'set_complete' })
      } else {
        const rowLength = state.rows.length
        if (state.gameCounter === rowLength) {
          setFailed(true)
        } else {
          dispatch({ type: 'increase_row' })
        }
      }
    } catch (error) {
      console.log(error)
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
          <Solution
            row={state.rows[state.currentRow]}
            foundCombination={state?.foundCombination}
          />
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
