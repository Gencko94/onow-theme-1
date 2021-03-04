import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import DesktopNavbar from '../../components/DesktopNavbar/DesktopNavbar';

const LayoutDesktop: React.FC = ({ children }) => {
  const { i18n } = useTranslation();
  return (
    <Wrapper>
      <DesktopNavbar />

      {children}
    </Wrapper>
  );
};

export default LayoutDesktop;
const Wrapper = styled.div`
  position: relative;
  font-family: ${props => props.theme.fontFamily};
`;
