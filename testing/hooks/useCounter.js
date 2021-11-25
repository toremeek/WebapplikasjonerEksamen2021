import { useCallback, useState } from 'react'

export function useCounter(initialState = 0) {
  const [counter, setCounter] = useState(initialState)

  const add = () => {
    setCounter(counter + 1)
  }

  const subtract = () => {
    setCounter(counter - 1)
  }

  return { add, subtract, counter }
}
