import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import DesktopNavbar from '../../components/DesktopNavbar/DesktopNavbar';
import SecondDesktopNavbar from '../../components/DesktopNavbar/SecondDesktopNavbar';
let curScroll = 0;

const LayoutDesktop: React.FC = ({ children }) => {
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
      <DesktopNavbar />
      <AnimatePresence>{showNav && <SecondDesktopNavbar />}</AnimatePresence>
      {children}
    </Wrapper>
  );
};

export default LayoutDesktop;
const Wrapper = styled.div`
  position: relative;
  font-family: ${props => props.theme.fontFamily};
`;
