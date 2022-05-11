const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_INITIATED':
      return {
        admin: null,
        isFetching: true,
        error: false,
        errorMsg: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        admin: action.payload,
        isFetching: false,
        error: false,
        errorMsg: null,
      };
    case 'LOGIN_FAILURE':
      return {
        admin: null,
        isFetching: false,
        error: true,
        errorMsg: action.payload,
      };
    case 'RESET':
      return {
        admin: null,
        isFetching: false,
        error: false,
        errorMsg: null,
      };
    case 'LOGOUT':
      return {
        admin: null,
        isFetching: false,
        error: false,
        errorMsg: null,
      };
    default:
      return { ...state };
  }
};

export default AuthReducer;
