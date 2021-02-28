import React from 'react';
import MobileNavbar from '../../components/MobileNavbar/MobileNavbar';
import { CSSTransition } from 'react-transition-group';
import Drawer from './Drawer/Drawer';
import MobileFooter from '../../components/MobileFooter/MobileFooter';
import styled from 'styled-components';
const ContentContainer = styled.div`
  min-height: 100vh;
`;
const Wrapper = styled.div`
  position: relative;
  font-family: ${props => props.theme.fontFamily};
`;
const LayoutMobile: React.FC = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);

  return (
    <Wrapper>
      <MobileNavbar setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen} />
      <CSSTransition
        in={drawerOpen}
        classNames="drawer-"
        unmountOnExit
        mountOnEnter
        timeout={300}
      >
        <Drawer setDrawerOpen={setDrawerOpen} />
      </CSSTransition>
      <ContentContainer>{children}</ContentContainer>
      <MobileFooter />
    </Wrapper>
  );
};

export default LayoutMobile;
