import { useState } from "react";
import { useContext } from "react";

import { CSSTransition } from "react-transition-group";

import styled from "styled-components";
import ModalHead from "../components/Modal/ModalHead";
import ModalOverlay from "../components/Modal/ModalOverlay";
import { ModalWrapper } from "../components/Modal/ModalWrapper";
import ProfilePassword from "../components/ProfileModal/ProfilePassword";
import ProfilePersonalInformation from "../components/ProfileModal/ProfilePersonalInformation";
import Button from "../components/reusables/Button";
import { FlexWrapper } from "../components/reusables/Flex";

import { ApplicationProvider } from "../contexts/ApplicationContext";
import { up } from "../utils/themes";

const ProfileModal = () => {
  const { profileModalOpen, handleToggleProfileModal } =
    useContext(ApplicationProvider);
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <ModalOverlay
        open={profileModalOpen!}
        handleClose={handleToggleProfileModal!}
      />
      <CSSTransition
        classNames="profile-modal"
        timeout={200}
        unmountOnExit
        in={profileModalOpen}
      >
        <Modal>
          <ModalHead
            closeFunction={handleToggleProfileModal!}
            title="My Profile"
          />
          <Tabs>
            <Button
              text="Personal Information"
              bg={activeTab === 0 ? "accent3" : "accent1"}
              padding="0.5rem"
              onClick={() => setActiveTab(0)}
              textSize="0.9rem"
            />

            <Button
              text="Password"
              bg={activeTab === 1 ? "accent3" : "accent1"}
              padding="0.5rem"
              onClick={() => setActiveTab(1)}
              textSize="0.9rem"
              margin="0 0.5rem"
            />
          </Tabs>
          {activeTab === 0 && <ProfilePersonalInformation />}
          {activeTab === 1 && <ProfilePassword />}
        </Modal>
      </CSSTransition>
    </>
  );
};

export default ProfileModal;
const Modal = styled(ModalWrapper)(
  ({ theme: { breakpoints, shadow, accent1 } }) => `
  position: fixed;
  z-index: 20;
  inset:100px 20px;
  position:fixed;
  border:none;
  outline:none;
  z-index:20;
  background-color:${accent1};

  ${up(breakpoints.md)}{
    inset:200px 250px;
  }
  ${up(breakpoints.lg)}{
    inset:224px 350px;
  }
  ${up(breakpoints.xl)}{
    inset:225px 550px;
  }
  `
);

const Tabs = styled(FlexWrapper)`
  overflow-x: auto;
  background-color: #fff;
  padding: 0.5rem;
`;
