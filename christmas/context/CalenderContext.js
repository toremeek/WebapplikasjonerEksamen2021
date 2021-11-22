import { createContext, useContext, useReducer } from 'react'

const initialState = {
  error: '',
  isLoading: false,
  slots: [],
}

const reducer = (state, action) => {
  const { type } = action

  switch (type) {
    case 'SET_CALENDER': {
      const { calender } = action

      return {
        ...state,
        ...calender,
      }
    }

    case 'OPEN_SLOT': {
      const { slotId, coupon } = action

      const { slot: slots } = state
      const slotIndex = slots.findIndex((obj) => obj.id === slotId)

      slots[slotIndex].isOpen = true
      slots[slotIndex].coupon = coupon

      return {
        ...state,
        slot: [...slots],
      }
    }

    case 'SET_DASHBOARD': {
      const { dashboard } = action

      return {
        ...state,
        dashboard,
      }
    }

    case 'SET_ERROR': {
      const { error } = action

      return {
        ...state,
        error,
      }
    }

    case 'SET_LOADING': {
      const { isLoading } = action

      return {
        ...state,
        isLoading,
      }
    }

    default:
      return state
  }
}

const CalenderContext = createContext()

const CalenderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <CalenderContext.Provider value={{ state, dispatch }}>
      {children}
    </CalenderContext.Provider>
  )
}

const useCalenderContext = () => {
  const context = useContext(CalenderContext)

  if (context === undefined)
    throw new Error('useCalenderContext must be used within a CalenderProvider')

  return context
}

export { CalenderProvider, useCalenderContext }
