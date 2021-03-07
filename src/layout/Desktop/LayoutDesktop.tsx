import React from 'react';

import styled from 'styled-components';
import DesktopNavbar from '../../components/DesktopNavbar/DesktopNavbar';

const LayoutDesktop: React.FC = ({ children }) => {
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
