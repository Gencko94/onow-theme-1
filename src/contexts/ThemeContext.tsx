import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import styled, { ThemeProvider as StyledThemes } from 'styled-components';
import { devices } from '../breakpoints';
import { darkTheme, lightTheme } from '../utils/themes';
import { ApplicationProvider } from './ApplicationContext';
export type ThemeMode = 'light' | 'dark' | string;
type ContextProps = {
  toggleTheme: () => void;
  mode: ThemeMode;
};

export const ThemeContext = createContext<Partial<ContextProps>>({});

const ThemeProvider: React.FC = ({ children }) => {
  const { store_theme } = useContext(ApplicationProvider);
  const [mode, setMode] = useState<ThemeMode>('light');
  const { i18n } = useTranslation();

  const fontFamily = useMemo(
    () => (i18n.language === 'ar' ? 'Cairo' : 'AmazonEmber'),
    [i18n.language]
  );

  const currentTheme = useMemo(() => {
    const theme =
      mode === 'light'
        ? { mainColor: store_theme?.primary_color, ...lightTheme }
        : darkTheme;
    return {
      fontFamily,
      breakpoints: devices,
      font: {
        light: '300',
        regular: '400',
        semibold: '500',
        bold: '700',
        xbold: '800',
      },
      ...theme,
    };
  }, [mode, fontFamily, store_theme]);

  const toggleTheme = useCallback(() => {
    if (mode === 'light') {
      setMode('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setMode('light');
      localStorage.setItem('theme', 'light');
    }
  }, [mode]);

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    localTheme && setMode(localTheme);
  }, []);
  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <StyledThemes theme={currentTheme}>
        <Container lang={i18n.language}>{children}</Container>
      </StyledThemes>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
const Container = styled.div<{ lang: string }>`
  font-family: ${props => props.theme.fontFamily};
  direction: ${props => (props.lang === 'ar' ? 'rtl' : 'ltr')};
  overflow: hidden;
`;
