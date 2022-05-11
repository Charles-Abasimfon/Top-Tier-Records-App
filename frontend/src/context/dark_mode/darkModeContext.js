import { createContext, useReducer } from 'react';
import DarkModeReducer from './darkModeReducer';

let darkModeStatus;

if (localStorage.getItem('prefers-dark-mode')) {
  darkModeStatus = JSON.parse(
    localStorage.getItem('prefers-dark-mode').toLowerCase()
  );
} else {
  darkModeStatus = false;
}

const INITIAL_STATE = {
  darkMode: darkModeStatus,
};

export const DarkModeContext = createContext(INITIAL_STATE);

export const DarkModeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  );
};
