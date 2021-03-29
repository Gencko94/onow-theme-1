import { Dispatch, SetStateAction, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ThemeContext } from '../../../contexts/ThemeContext';

interface IProps {
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
  drawerOpen: boolean;
}

const HamburgerButton = styled.button<{ rtl: boolean }>`
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Hamburger = ({ drawerOpen, setDrawerOpen }: IProps) => {
  const { i18n } = useTranslation();
  const { mode } = useContext(ThemeContext);

  const handleDrawer = () => {
    if (drawerOpen) {
      setDrawerOpen(false);
    } else {
      setDrawerOpen(true);
    }
  };

  return (
    <HamburgerButton rtl={i18n.language === 'ar'} onClick={handleDrawer}>
      <svg
        stroke={mode === 'dark' ? '#fff' : drawerOpen ? '#252525' : '#fff'}
        width="23"
        height="23"
        viewBox="0 0 23 23"
      >
        <path
          id="ham_first-bar"
          fill="#555"
          strokeWidth="3"
          strokeLinecap="round"
          d="M 2 2.5 L 20 2.5"
        />
        <path
          id="ham_second-bar"
          fill="#555"
          strokeWidth="3"
          strokeLinecap="round"
          d="M 2 9.423 L 20 9.423"
        />
        <path
          id="ham_third-bar"
          fill="#555"
          strokeWidth="3"
          strokeLinecap="round"
          d="M 2 16.346 L 20 16.346"
        />
      </svg>
    </HamburgerButton>
  );
};

export default Hamburger;
