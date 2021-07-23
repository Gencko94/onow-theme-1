import { useContext } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ApplicationProvider } from "../../../contexts/ApplicationContext";
import { ThemeContext } from "../../../contexts/ThemeContext";

const HamburgerButton = styled.button<{ rtl: boolean }>`
  z-index: 10;
  margin-left: ${(props) => (props.rtl ? "0.75rem" : 0)};
  margin-right: ${(props) => (!props.rtl ? "0.75rem" : 0)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Hamburger = () => {
  const { i18n } = useTranslation();
  const { mode } = useContext(ThemeContext);
  const { drawerOpen, handleToggleDrawer } = useContext(ApplicationProvider);

  return (
    <HamburgerButton
      rtl={i18n.language === "ar"}
      onClick={() => handleToggleDrawer?.()}
    >
      <svg
        stroke={mode === "dark" ? "#fff" : drawerOpen ? "#252525" : "#fff"}
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
