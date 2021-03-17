import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LeftSideIcons from './LeftSideIcons';
import RightSideIcons from './RightSideIcons';

const DesktopNavbar = () => {
  const { t, i18n, ready } = useTranslation(['home']);
  const changeLanguage = (lng: string) => {
    if (ready) {
      i18n.changeLanguage(lng);
    }
  };
  const [changeView, setChangeView] = useState<boolean>(false);
  const { pathname } = useLocation();
  console.log(pathname);
  const shouldChange = useMemo(() => {
    if (
      pathname === '/' ||
      pathname.includes('categories') ||
      pathname.includes('booking') ||
      pathname.includes('products')
    )
      return true;
    return false;
  }, [pathname]);
  const shouldChangeColor = useCallback(() => {
    if (!shouldChange) {
      return true;
    } else {
      if (changeView) {
        return true;
      } else {
        return false;
      }
    }
  }, [changeView]);
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
      <LeftSideIcons />
      <RightSideIcons />
    </Container>
  );
};

export default DesktopNavbar;
const Container = styled.div<{
  changeColor: () => boolean;
  changeView: boolean;
  shouldChange: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
