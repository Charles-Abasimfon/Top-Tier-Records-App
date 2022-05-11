const SettingsReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SETTINGS':
      return {
        settings: action.payload,
      };
    case 'DELETE_SETTINGS':
      return {
        settings: null,
      };
    default:
      return { ...state };
  }
};

export default SettingsReducer;
