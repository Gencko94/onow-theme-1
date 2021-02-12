import React from 'react';
import DesktopNavbar from '../../components/DesktopNavbar/DesktopNavbar';

const LayoutDesktop: React.FC = ({ children }) => {
  return (
    <div className="min-h-full">
      <DesktopNavbar />

      {children}
    </div>
  );
};

export default LayoutDesktop;
