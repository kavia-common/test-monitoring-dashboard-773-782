import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import './ThemeProvider.css';

const ThemeContext = createContext({
  theme: 'light',
  // PUBLIC_INTERFACE
  toggleTheme: () => {},
});

// PUBLIC_INTERFACE
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const api = useMemo(() => ({
    theme,
    toggleTheme: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
  }), [theme]);

  return (
    <ThemeContext.Provider value={api}>
      {children}
    </ThemeContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useTheme() {
  return useContext(ThemeContext);
}
