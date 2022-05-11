const DarkModeReducer = (state, action) => {
  switch (action.type) {
    case 'LIGHT_MODE':
      localStorage.setItem('prefers-dark-mode', false);
      return {
        darkMode: false,
      };

    case 'DARK_MODE':
      localStorage.setItem('prefers-dark-mode', true);
      return {
        darkMode: true,
      };
    default:
      localStorage.setItem('prefers-dark-mode', false);
      return state;
  }
};

export default DarkModeReducer;
