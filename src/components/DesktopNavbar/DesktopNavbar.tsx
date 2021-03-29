import { useMemo } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import LeftSideIcons from './LeftSideIcons';
import RightSideIcons from './RightSideIcons';

const DesktopNavbar = () => {
  const { pathname } = useLocation();
  const isTransparent = useMemo(() => {
    if (
      pathname === '/' ||
      pathname.includes('menu') ||
      pathname.includes('booking') ||
      pathname.includes('products')
    )
      return true;
    return false;
  }, [pathname]);

  return (
    <Container isTransparent={isTransparent}>
      <LeftSideIcons />
      <RightSideIcons />
    </Container>
  );
};

export default DesktopNavbar;
const Container = styled.header<{
  isTransparent: boolean;
}>`
  font-weight: ${props => props.theme.font.regular};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: ${props => (props.isTransparent ? 'absolute' : '')};
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.5rem;

  z-index: 9;
  transition: all 100ms ease;
  background-color: ${props =>
    props.isTransparent ? 'transparent' : props.theme.mainColor};
`;
