import React from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from 'styled-components';
import { devices } from '../../breakpoints';
import DesktopNavbar from '../../components/DesktopNavbar/DesktopNavbar';

const LayoutDesktop: React.FC = ({ children }) => {
  const { i18n } = useTranslation();
  return (
    <ThemeProvider
      theme={{
        mainColor: '#b11e29',
        secondaryColor: '#5F7999',
        fontFamily: i18n.language === 'ar' ? 'Tajawal' : 'Poppins',
        breakpoints: devices,
      }}
    >
      <div className="min-h-full">
        <DesktopNavbar />

        {children}
      </div>
    </ThemeProvider>
  );
};

export default LayoutDesktop;
