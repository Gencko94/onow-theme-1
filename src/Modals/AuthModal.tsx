import { useContext } from "react";

import ModalOverlay from "../components/Modal/ModalOverlay";
import { CSSTransition } from "react-transition-group";

import { ApplicationProvider } from "../contexts/ApplicationContext";

import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const AuthModal = () => {
  const { authModalStatus, handleCloseAuthModal } =
    useContext(ApplicationProvider);

  return (
    <>
      <ModalOverlay
        open={authModalStatus!.open}
        handleClose={handleCloseAuthModal!}
      />
      <CSSTransition
        classNames="profile-modal"
        timeout={200}
        unmountOnExit
        in={authModalStatus!.open}
      >
        {authModalStatus?.mode === "login" ? (
          <LoginModal />
        ) : authModalStatus?.mode === "register" ? (
          <RegisterModal />
        ) : (
          ""
        )}
      </CSSTransition>
    </>
  );
};

export default AuthModal;
