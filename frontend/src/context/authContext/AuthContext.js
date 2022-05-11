import { useReducer, createContext, useEffect } from 'react';
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
  admin: JSON.parse(sessionStorage.getItem('admin')) || null,
  isFetching: false,
  error: false,
  errorMsg: null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    sessionStorage.setItem('admin', JSON.stringify(state.admin));
  }, [state.admin]);

  return (
    <AuthContext.Provider
      value={{
        admin: state.admin,
        isFetching: state.isFetching,
        error: state.error,
        errorMsg: state.errorMsg,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
