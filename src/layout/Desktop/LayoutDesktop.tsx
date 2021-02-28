import React from 'react';
import { useTranslation } from 'react-i18next';
import DesktopNavbar from '../../components/DesktopNavbar/DesktopNavbar';

const LayoutDesktop: React.FC = ({ children }) => {
  const { i18n } = useTranslation();
  return (
    <div className="min-h-full">
      <DesktopNavbar />

      {children}
    </div>
  );
};

export default LayoutDesktop;
