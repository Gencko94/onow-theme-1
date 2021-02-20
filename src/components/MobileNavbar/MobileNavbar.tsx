import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styled, { DefaultTheme, ThemeProps } from 'styled-components';
import { useLocation } from 'react-router';
import Hamburger from './MobileNavIcons/Hamburger';
import MobileNavIcons from './MobileNavIcons/MobileNavIcons';
import { Link } from 'react-router-dom';
interface IProps {
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

const MobileNavbar = ({ setDrawerOpen, drawerOpen }: IProps) => {
  const { pathname } = useLocation();
  const isHome = useMemo(() => {
    console.log(pathname);
    if (pathname === '/') return true;
    return false;
  }, [pathname]);
  const [changeView, setChangeView] = useState<boolean>(false);
  const handleSideMenuOpen = () => {
    setDrawerOpen(!drawerOpen);
  };
  const shouldChangeColor = useCallback(() => {
    if (!isHome) {
      if (drawerOpen) {
        return false;
      }
      return true;
    } else {
      if (changeView) {
        if (drawerOpen) return false;
        return true;
      } else {
        return false;
      }
    }
  }, [drawerOpen, changeView]);
  useEffect(() => {
    const checkScrolling = () => {
      if (window.scrollY >= 140) {
        setChangeView(true);
      } else {
        setChangeView(false);
      }
    };
    window.addEventListener('scroll', checkScrolling);
    return () => {
      window.removeEventListener('scroll', checkScrolling);
    };
  }, []);
  return (
    <>
      <Container changeColor={shouldChangeColor}>
        <LogoContainer to="/">
          <img src="/images/logo.png" alt="logo" />
        </LogoContainer>
        <MobileNavIcons />
      </Container>
      <Hamburger setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen} />
    </>
  );
};

export default MobileNavbar;

interface Props extends ThemeProps<DefaultTheme> {
  changeColor: () => boolean;
}
const Container = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.5rem 0.5rem;
  z-index: 9;
  transition: background-color 700ms;
  background-color: ${(props: Props) =>
    props.changeColor() ? props.theme.mainColor : 'transparent'};
`;
const LogoContainer = styled(Link)`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 45px;
`;
