import { useState } from "react";
import { useContext } from "react";

import ReactModal from "react-modal";

import styled from "styled-components";
import ModalHead from "../components/Modal/ModalHead";
import ProfilePassword from "../components/ProfileModal/ProfilePassword";
import ProfilePersonalInformation from "../components/ProfileModal/ProfilePersonalInformation";
import Button from "../components/reusables/Button";
import { FlexWrapper } from "../components/reusables/Flex";

import { ApplicationProvider } from "../contexts/ApplicationContext";

const ProfileModal = () => {
  const { profileModalOpen, handleToggleProfileModal } =
    useContext(ApplicationProvider);
  const [activeTab, setActiveTab] = useState(0);
  return (
    <ReactModal
      isOpen={profileModalOpen!}
      onRequestClose={handleToggleProfileModal!}
      closeTimeoutMS={200}
      className="modal profile-modal"
    >
      <ModalHead closeFunction={handleToggleProfileModal!} title="My Profile" />
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
    </ReactModal>
  );
};

export default ProfileModal;

const Tabs = styled(FlexWrapper)`
  overflow-x: auto;
  background-color: #fff;
  padding: 0.5rem;
`;
