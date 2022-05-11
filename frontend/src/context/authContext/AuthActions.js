export const loginStart = () => ({
  type: 'LOGIN_INITIATED',
});

export const loginSuccess = (admin) => ({
  type: 'LOGIN_SUCCESS',
  payload: admin,
});

export const loginFailure = (errorMsg) => ({
  type: 'LOGIN_FAILURE',
  payload: errorMsg,
});

export const loginReset = () => ({
  type: 'RESET',
});

export const logout = () => ({
  type: 'LOGOUT',
});
