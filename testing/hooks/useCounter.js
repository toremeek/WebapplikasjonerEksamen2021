import { useCallback, useState } from 'react'

export function useCounter(initialState = 0) {
  const [counter, setCounter] = useState(initialState)

  const add = useCallback(
    (delta = 1) => setCounter((counter) => counter + delta),
    [setCounter]
  )

  const subtract = useCallback(
    (delta = 1) => setCounter((counter) => counter - delta),
    [setCounter]
  )

  return { add, subtract, counter }
}
