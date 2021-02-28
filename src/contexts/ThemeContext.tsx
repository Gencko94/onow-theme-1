import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider as StyledThemes } from 'styled-components';
import { darkTheme, lightTheme } from '../utils/themes';

type ContextProps = {
  toggleTheme: () => void;
};

export const ThemeContext = createContext<Partial<ContextProps>>({});

const ThemeProvider: React.FC = ({ children }) => {
  const [mode, setMode] = useState<string>('light');
  const { i18n } = useTranslation();
  const fontFamily = useMemo(
    () => (i18n.language === 'ar' ? 'Tajawal' : 'Poppins'),
    [i18n.language]
  );
  const currentTheme = useMemo(() => {
    if (mode === 'light') return { fontFamily, ...lightTheme };
    return { fontFamily, ...darkTheme };
  }, [mode, fontFamily]);

  const toggleTheme = useCallback(() => {
    if (mode === 'light') {
      setMode('dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      setMode('light');
      window.localStorage.setItem('theme', 'light');
    }
  }, [mode]);

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setMode(localTheme);
  }, []);
  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <StyledThemes theme={currentTheme}>{children}</StyledThemes>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
