import React from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { DarkModeContextProvider } from './context/dark_mode/darkModeContext';
import { AuthContextProvider } from './context/authContext/AuthContext';
import { SettingsContextProvider } from './context/settings/SettingsContext';
import App from './app/App';
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DarkModeContextProvider>
        <SettingsContextProvider>
          <App />
        </SettingsContextProvider>
      </DarkModeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
