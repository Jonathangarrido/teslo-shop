import { FC, useReducer } from 'react'
import { UiContext, uiReducer } from './'

export interface UiState {
  isMenuOpen: boolean
}

const Ui_INITIAL_STATE: UiState = {
  isMenuOpen: false,
}

export const UiProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, Ui_INITIAL_STATE)

  const toggleSideMenu = () => {
    dispatch({ type: 'Ui - ToggleMenu' })
  }

  return <UiContext.Provider value={{ ...state, toggleSideMenu }}>{children}</UiContext.Provider>
}
