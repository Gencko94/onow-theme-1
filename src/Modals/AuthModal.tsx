import { useContext } from "react";

import ReactModal from "react-modal";

import { ApplicationProvider } from "../contexts/ApplicationContext";

import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const AuthModal = () => {
  const { authModalStatus, handleCloseAuthModal } =
    useContext(ApplicationProvider);

  return (
    <ReactModal
      isOpen={authModalStatus!.open}
      onRequestClose={handleCloseAuthModal!}
      closeTimeoutMS={200}
      className="modal auth-modal"
    >
      {authModalStatus?.mode === "login" ? (
        <LoginModal />
      ) : authModalStatus?.mode === "register" ? (
        <RegisterModal />
      ) : (
        ""
      )}
    </ReactModal>
  );
};

export default AuthModal;
