import { useContext, useRef } from "react";
import styled from "styled-components";
import { IoMdListBox } from "react-icons/io";
import { BiGitBranch, BiFoodMenu } from "react-icons/bi";
import { FaMapMarkerAlt, FaMotorcycle } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi";
import { MdMail } from "react-icons/md";
import { CSSTransition } from "react-transition-group";

import {
  AiFillInfoCircle,
  AiOutlinePoweroff,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { useHistory } from "react-router-dom";
import ThemeToggler from "../../../utils/ThemeToggler";
import { useTranslation } from "react-i18next";
import { ApplicationProvider } from "../../../contexts/ApplicationContext";
import Hamburger from "../../../components/MobileNavbar/MobileNavIcons/Hamburger";
import { AuthProvider } from "../../../contexts/AuthContext";
import ModalOverlay from "../../../components/Modal/ModalOverlay";
import Heading from "../../../components/reusables/Heading";
import Flex from "../../../components/reusables/Flex";
import Button from "../../../components/reusables/Button";
import Hr from "../../../components/reusables/Hr";
import Grid from "../../../components/reusables/Grid";
import Paragraph from "../../../components/reusables/Paragraph";

const Drawer = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const {
    store_name,
    drawerOpen,
    handleToggleDrawer,
    setAuthModalStatus,
    handleToggleProfileModal,
  } = useContext(ApplicationProvider);
  const { user } = useContext(AuthProvider);
  let linksRef = useRef<HTMLDivElement | null>(null);
  const history = useHistory();

  return (
    <>
      <ModalOverlay open={drawerOpen!} handleClose={handleToggleDrawer!} />
      <CSSTransition
        classNames={language === "en" ? "drawer-ltr" : "drawer-rtl"}
        timeout={200}
        unmountOnExit
        in={drawerOpen}
      >
        <Container rtl={language === "ar"}>
          <div className="hamburger-container">
            <Hamburger />
          </div>
          <div>
            {user && (
              <div>
                <Heading tag="h3" weight="semibold">
                  {t("hello")} {user?.first_name} !
                </Heading>
                <Paragraph
                  margin="0 0.5rem"
                  color="textSecondary"
                  fontSize="1.2rem"
                >
                  {user?.phone_number}
                </Paragraph>
              </div>
            )}
            {!user && (
              <div>
                <Heading tag="h3" align="center" weight="semibold">
                  {store_name?.[language]}
                </Heading>
                <Flex justify="center" margin="1rem 0">
                  <Button
                    text={t("login")}
                    bg="primary"
                    textSize="0.9rem"
                    onClick={() => {
                      setAuthModalStatus?.({ mode: "login", open: true });
                    }}
                    padding="0.4rem"
                  />
                </Flex>
              </div>
            )}
          </div>
          <Hr />
          <Grid cols="1fr" gap="1.5rem">
            <Flex
              onClick={() => {
                history.push("/menu");
              }}
            >
              <BiFoodMenu size={25} color="#04b9aa" />
              <Paragraph margin="0 0.5rem" fontSize="1.1rem">
                {t("common:our-menu")}
              </Paragraph>
            </Flex>
            <Flex
              onClick={() => {
                history.push("/branches");
              }}
            >
              <BiGitBranch size={25} color="#b99e04" />
              <Paragraph margin="0 0.5rem" fontSize="1.1rem">
                {t("common:our-branches")}
              </Paragraph>
            </Flex>
            {/* {user && (
              <> */}
            <Flex
              onClick={() => {
                handleToggleDrawer?.();
                handleToggleProfileModal?.();
              }}
            >
              <HiUserCircle size={25} color="#dd321b" />
              <Paragraph margin="0 0.5rem" fontSize="1.1rem">
                {t("common:my-profile")}
              </Paragraph>
            </Flex>
            <Flex>
              <IoMdListBox size={25} color="#04b922" />
              <Paragraph margin="0 0.5rem" fontSize="1.1rem">
                {t("common:my-orders")}
              </Paragraph>
            </Flex>
            <Flex>
              <FaMapMarkerAlt size={25} color="#c11ce2" />
              <Paragraph margin="0 0.5rem" fontSize="1.1rem">
                {t("common:my-addresses")}
              </Paragraph>
            </Flex>
            {/* </>
            )} */}
          </Grid>
          <Hr />
          <Grid cols="1fr" gap="1.5rem" margin="0">
            <Flex>
              <FaMotorcycle size={25} color="#37c0b5" />
              <Paragraph margin="0 0.5rem" fontSize="1.1rem">
                {t("common:set-up-order-mode")}
              </Paragraph>
            </Flex>
            <Flex>
              <MdMail size={25} color="#3277f8" />
              <Paragraph margin="0 0.5rem" fontSize="1.1rem">
                {t("common:contact-us")}
              </Paragraph>
            </Flex>
            <Flex>
              <AiFillInfoCircle size={25} color="#29affc" />
              <Paragraph margin="0 0.5rem" fontSize="1.1rem">
                {t("common:about-us")}
              </Paragraph>
            </Flex>
          </Grid>
          <Hr />
          <Flex justify="space-between">
            <Paragraph margin="0 0.5rem" fontSize="1.2rem">
              {t("dark-mode")}
            </Paragraph>

            <ThemeToggler />
          </Flex>
        </Container>
      </CSSTransition>
    </>
  );
};

export default Drawer;

const Container = styled.nav<{ rtl: boolean }>`
  position: fixed;
  height: 100vh;
  left: ${(props) => (props.rtl ? "auto" : "0")};
  right: ${(props) => (props.rtl ? "0" : "auto")};
  overflow: hidden;
  z-index: 20;
  padding: 0.5rem;
  width: 65%;
  background-color: ${(props) => props.theme.bodyColor};
  .hamburger-container {
    padding: 1rem;
  }
`;
