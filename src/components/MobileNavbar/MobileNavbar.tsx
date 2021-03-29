import { Dispatch, SetStateAction, useMemo } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import Hamburger from './MobileNavIcons/Hamburger';
import MobileNavIcons from './MobileNavIcons/MobileNavIcons';

interface IProps {
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

const MobileNavbar = ({ setDrawerOpen, drawerOpen }: IProps) => {
  const { pathname } = useLocation();
  const isTransparent = useMemo(() => {
    if (
      pathname === '/' ||
      pathname.includes('menu') ||
      pathname.includes('booking')
    )
      return true;
    return false;
  }, [pathname]);

  return (
    <>
      <Container isTransparent={isTransparent}>
        <Hamburger setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen} />
        <MobileNavIcons />
      </Container>
    </>
  );
};

export default MobileNavbar;

const Container = styled.div<{
  isTransparent: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: ${props => (props.isTransparent ? 'absolute' : '')};
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.5rem;
  z-index: 9;
  transition: background-color 700ms;
  background-color: ${props =>
    props.isTransparent ? 'transparent' : props.theme.mainColor};
`;
