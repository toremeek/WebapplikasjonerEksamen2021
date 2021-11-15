import { createContext, useContext, useReducer } from 'react'

const reducer = (state, { type, id }) => {
  switch (type) {
    case 'OPEN_SLOT': {
      const { slot: slots } = state
      const slotIndex = slots.findIndex((obj) => obj.id === id)

      slots[slotIndex].isOpen = true

      return {
        ...state,
        slot: [...slots],
      }
    }

    default:
      return state
  }
}

const CalenderContext = createContext()
const CalenderContextDispatch = createContext(() => {})

export const CalenderProvider = ({ children, value }) => {
  const [state, dispatch] = useReducer(reducer, value)

  return (
    <CalenderContextDispatch.Provider value={dispatch}>
      <CalenderContext.Provider value={{ state }}>
        {children}
      </CalenderContext.Provider>
    </CalenderContextDispatch.Provider>
  )
}

export const useCalender = () => useContext(CalenderContext)
export const useCalenderDispatch = () => useContext(CalenderContextDispatch)
