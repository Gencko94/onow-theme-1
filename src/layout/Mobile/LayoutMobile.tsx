import { useEffect, useState } from 'react';
import MobileNavbar from '../../components/MobileNavbar/MobileNavbar';
import { CSSTransition } from 'react-transition-group';
import Drawer from './Drawer/Drawer';

import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import SecondMobileNavbar from '../../components/MobileNavbar/SecondMobileNavbar';
import { AnimatePresence } from 'framer-motion';
let curScroll = 0;
const Wrapper = styled.div`
  background-color: ${props => props.theme.bodyColor};
  font-family: ${props => props.theme.fontFamily};
`;
const LayoutMobile: React.FC = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const { i18n } = useTranslation();
  const [showNav, setShowNav] = useState<boolean>(false);
  useEffect(() => {
    const checkScrolling = () => {
      if (window.scrollY > curScroll) {
        curScroll = window.scrollY;
        if (window.scrollY >= 100) {
          setShowNav(false);
          console.log('down');
        }
      } else if (window.scrollY < curScroll) {
        curScroll = window.scrollY;
        if (window.scrollY >= 100) {
          console.log('true');
          setShowNav(true);
        } else {
          setShowNav(false);
        }
      }
    };
    window.addEventListener('scroll', checkScrolling);
    return () => {
      window.removeEventListener('scroll', checkScrolling);
    };
  }, []);
  return (
    <Wrapper>
      <MobileNavbar setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen} />
      <AnimatePresence>
        {showNav && (
          <SecondMobileNavbar
            setDrawerOpen={setDrawerOpen}
            drawerOpen={drawerOpen}
          />
        )}
      </AnimatePresence>
      <CSSTransition
        in={drawerOpen}
        classNames={`drawer_${i18n.language}-`}
        unmountOnExit
        mountOnEnter
        timeout={300}
      >
        <Drawer setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen} />
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
      {children}
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
