import React from 'react';
import MobileNavbar from '../../components/MobileNavbar/MobileNavbar';
import { CSSTransition } from 'react-transition-group';
import Drawer from './Drawer/Drawer';

import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
const ContentContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.bodyColor};
`;
const Wrapper = styled.div`
  position: relative;
  font-family: ${props => props.theme.fontFamily};
`;
const LayoutMobile: React.FC = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  const { i18n } = useTranslation();

  return (
    <Wrapper>
      <MobileNavbar setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen} />

      <CSSTransition
        in={drawerOpen}
        classNames={`drawer_${i18n.language}-`}
        unmountOnExit
        mountOnEnter
        timeout={300}
      >
        <Drawer setDrawerOpen={setDrawerOpen} />
      </CSSTransition>
      <CSSTransition
        in={drawerOpen}
        classNames="backdrop"
        unmountOnExit
        mountOnEnter
        timeout={300}
      >
        <Backdrop onClick={() => setDrawerOpen(false)} />
      </CSSTransition>
      <ContentContainer>{children}</ContentContainer>
      {/* <MobileFooter /> */}
    </Wrapper>
  );
};

export default LayoutMobile;
const Backdrop = styled.span`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;
