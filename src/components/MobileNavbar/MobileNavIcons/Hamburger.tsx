import { Dispatch, SetStateAction, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ThemeContext } from '../../../contexts/ThemeContext';

interface IProps {
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
  drawerOpen: boolean;
}

const HamburgerButton = styled.button<{ rtl: boolean }>`
  z-index: 400;
  position: fixed;
  top: 0;
  /* left: 0; */
  left: ${props => !props.rtl && 0};
  right: ${props => props.rtl && 0};
  padding: 1rem;
  /* padding-top: 1.5rem; */
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
  // useEffect(() => {
  //   if (drawerOpen) {
  //     timeline.play();
  //   } else {
  //     timeline.reverse();
  //   }
  // }, [drawerOpen, timeline]);
  // useEffect(() => {
  //   timeline
  //     .to('#ham_first-bar', { rotate: 45, y: 7, transformOrigin: 'center' }, 0)
  //     .to('#ham_second-bar', { scale: 0, transformOrigin: 'center' }, 0)
  //     .to(
  //       '#ham_third-bar',
  //       { rotate: -45, y: -7, transformOrigin: 'center' },
  //       0
  //     );
  // }, [timeline]);
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
