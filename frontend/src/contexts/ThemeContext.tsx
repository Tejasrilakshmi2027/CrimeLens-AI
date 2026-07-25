import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Theme } from '../types';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return JSON.parse(savedTheme);
    }
    return {
      mode: 'dark',
      primaryColor: '#06B6D4',
    };
  });

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
    // Apply theme to document
    if (theme.mode === 'dark') {
      document.documentElement.classList.remove('light');
      document.body.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.body.classList.add('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => ({
      ...prev,
      mode: prev.mode === 'dark' ? 'light' : 'dark',
    }));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
