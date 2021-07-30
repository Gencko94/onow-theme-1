import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import CartToast from "../components/CartToast/CartToast";
import Navbar from "../components/Navbar/Navbar";
import Toast from "../components/Toast/Toast";
import { ApplicationProvider } from "../contexts/ApplicationContext";
import useResponsive from "../hooks/useResponsive";
import AuthModal from "../Modals/AuthModal";
import CartModal from "../Modals/CartModal";
import ProfileModal from "../Modals/ProfileModal";
import { up } from "../utils/themes";
import Drawer from "./Mobile/Drawer/Drawer";

let curScroll = 0;

const LayoutDesktop: React.FC = ({ children }) => {
  const [showNav, setShowNav] = useState<boolean>(false);
  const { drawerOpen, toastStatus } = useContext(ApplicationProvider);

  const {
    i18n: { language },
  } = useTranslation();
  useEffect(() => {
    const checkScrolling = () => {
      if (window.scrollY > curScroll) {
        curScroll = window.scrollY;
        if (window.scrollY >= 100) {
          setShowNav(false);
        }
      } else if (window.scrollY < curScroll) {
        curScroll = window.scrollY;
        if (window.scrollY >= 100) {
          setShowNav(true);
        } else {
          setShowNav(false);
        }
      }
    };
    window.addEventListener("scroll", checkScrolling);
    return () => {
      window.removeEventListener("scroll", checkScrolling);
    };
  }, []);
  const { isDesktop } = useResponsive();
  return (
    <Wrapper>
      <CSSTransition
        in={toastStatus?.open}
        classNames="error-toast"
        unmountOnExit
        timeout={200}
      >
        <Toast
          text={toastStatus!.text}
          btnText="Close"
          closeFunction={() => toastStatus?.fn()}
          type={toastStatus!.type}
        />
      </CSSTransition>
      <AuthModal />
      <ProfileModal />

      <CartModal />
      {!isDesktop && <CartToast />}

      <Drawer />

      <Navbar />
      <div className="content-container">{children}</div>
    </Wrapper>
  );
};

export default LayoutDesktop;
const Wrapper = styled.div(
  ({ theme: { breakpoints, fontFamily } }) => `
  position: relative;
  font-family: ${fontFamily};
  .content-container {
    padding:0.5rem;
    max-width: 1240px;
    margin: 0 auto;
  }
  ${up(breakpoints.md)}{
    .content-container {
      padding:1rem 0;
      
    }
    
  }
  `
);
