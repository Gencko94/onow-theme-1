import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import Hamburger from './MobileNavIcons/Hamburger';
import MobileNavIcons from './MobileNavIcons/MobileNavIcons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
interface IProps {
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

const MobileNavbar = ({ setDrawerOpen, drawerOpen }: IProps) => {
  const { pathname } = useLocation();
  console.log(pathname);
  const shouldChange = useMemo(() => {
    if (
      pathname === '/' ||
      pathname.includes('categories') ||
      pathname.includes('booking') ||
      pathname.includes('checkout')
    )
      return true;
    return false;
  }, [pathname]);
  const [changeView, setChangeView] = useState<boolean>(false);

  const shouldChangeColor = useCallback(() => {
    if (!shouldChange) {
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
      <Container
        changeView={changeView}
        shouldChange={shouldChange}
        changeColor={shouldChangeColor}
      >
        {/* <LogoContainer to="/">
          <img src="/images/logo.png" alt="logo" />
        </LogoContainer> */}
        {/* <LanguageButton onClick={() => changeLanguage()}>
          {i18n.language === 'ar' ? 'EN' : 'AR'}
        </LanguageButton> */}
        <MobileNavIcons shouldChangeColor={shouldChangeColor} />
      </Container>
      <Hamburger setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen} />
    </>
  );
};

export default MobileNavbar;

const Container = styled.div<{
  changeColor: () => boolean;
  changeView: boolean;
  shouldChange: boolean;
}>`
  display: flex;
  align-items: center;
  position: ${props => (props.shouldChange ? 'fixed' : 'sticky')};
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.5rem;
  z-index: 9;
  transition: background-color 700ms;
  background-color: ${props =>
    props.changeColor() ? props.theme.navColor : 'transparent'};
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
