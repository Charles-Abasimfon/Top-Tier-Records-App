import { useReducer, createContext, useEffect } from 'react';
import SettingsReducer from './SettingsReducer';

const INITIAL_STATE = {
  settings: JSON.parse(sessionStorage.getItem('settings')) || null,
};

export const SettingsContext = createContext(INITIAL_STATE);

export const SettingsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SettingsReducer, INITIAL_STATE);

  useEffect(() => {
    sessionStorage.setItem('settings', JSON.stringify(state.settings));
  }, [state.settings]);

  return (
    <SettingsContext.Provider
      value={{
        settings: state.settings,
        dispatch,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
