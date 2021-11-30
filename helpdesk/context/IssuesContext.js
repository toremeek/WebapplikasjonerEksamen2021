import { createContext, useContext, useReducer } from 'react'

import { filterProps } from '@/lib/filterProps'

const initialState = {
  issues: [],
  filter: { ...filterProps },
  isGlobalLoading: false,
  error: '',
}

// (state, action) action.data / payload
const reducer = (state, action) => {
  const { type } = action

  switch (type) {
    // Oppdaterer hele issues-listen
    case 'SET_ISSUES': {
      const { issues } = action

      return { ...state, issues }
    }

    // Oppdaterer en enkelt issue
    case 'SET_ISSUE': {
      const { issue } = action
      const { issues } = state

      // Sjekker om issue allerede er i listen
      // (kan skje hvis man går direkte til siden og ikke via alle saker, da er ikke context oppdatert)
      const issueIndex = issues.findIndex((obj) => obj.id === issue.id)

      // Hvis den ikke er i listen legg den til
      if (issueIndex === -1) issues.push(issue)
      // Eller oppdater den indeksen med issue
      else issues[issueIndex] = { ...issues[issueIndex], ...issue }

      return { ...state, issues: [...issues] }
    }

    case 'ADD_NEW_COMMENT_TO_ISSUE': {
      const { comment, issueId } = action
      const { issues } = state

      const issueIndex = issues.findIndex((obj) => obj.id === issueId)

      issues[issueIndex].comments = [...issues[issueIndex].comments, comment]

      return { ...state, issues: [...issues] }
    }

    case 'ISLOADING': {
      return { ...state, isGlobalLoading: action.isLoading }
    }

    case 'SET_ERROR': {
      return { ...state, error: action.error }
    }

    default:
      return state
  }
}

const IssueContext = createContext()

const IssueProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }

  return <IssueContext.Provider value={value}>{children}</IssueContext.Provider>
}

const useIssueContext = () => {
  const context = useContext(IssueContext)

  if (context === undefined) {
    throw new Error('useIssueContext must be used within a IssueProvider')
  }

  return context
}

export { IssueProvider, useIssueContext }
