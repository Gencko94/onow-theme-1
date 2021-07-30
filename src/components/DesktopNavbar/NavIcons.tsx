import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiChevronDown } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";

import styled from "styled-components";
import { ApplicationProvider } from "../../contexts/ApplicationContext";

import useResponsive from "../../hooks/useResponsive";
import Paragraph from "../reusables/Paragraph";
import { CSSTransition } from "react-transition-group";
import Popover from "../reusables/Popover";
import Button from "../reusables/Button";

import Flex, { FlexWrapper } from "../reusables/Flex";
const NavIcons = () => {
  const { t, ready, i18n } = useTranslation();

  const {
    setAuthModalStatus,
    handleToggleProfileModal,
    handleToggleCartModal,
  } = useContext(ApplicationProvider);
  const { isDesktop } = useResponsive();
  const [menuOpen, setMenuOpen] = useState(false);
  const changeLanguage = (lng: string) => {
    if (ready) {
      i18n.changeLanguage(lng);
    }
  };
  return (
    <Container>
      {isDesktop && (
        <OrderModeContainer>
          <Button
            noRadius
            text="Delivery"
            padding="0.5rem 1rem"
            bg="accent1"
            iconSize={15}
            onClick={(e) => {
              setMenuOpen(false);
              e.stopPropagation();
            }}
          />
          <Button
            text="Pickup"
            noRadius
            padding="0.5rem 1rem"
            bg="accent1"
            iconSize={15}
            onClick={(e) => {
              setMenuOpen(false);
              e.stopPropagation();
            }}
          />
        </OrderModeContainer>
      )}

      {isDesktop && (
        <Button
          text="3.000"
          Icon={HiOutlineShoppingBag}
          padding="0.5rem 1rem"
          bg="accent1"
          iconSize={15}
          onClick={(e) => {
            handleToggleCartModal?.();
            e.stopPropagation();
          }}
        />
      )}
      {!isDesktop && (
        <IconButton
          onClick={() => {
            handleToggleCartModal?.();
          }}
        >
          <HiOutlineShoppingBag size={25} />
        </IconButton>
      )}
      {isDesktop && (
        <IconButton
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
          <FiChevronDown size={25} />
          <CSSTransition
            in={menuOpen}
            classNames="menu"
            unmountOnExit
            timeout={100}
          >
            <Popover
              origin="top"
              top="5px"
              closeFunction={() => setMenuOpen(false)}
            >
              <Flex
                justify="center"
                onClick={() => {
                  setMenuOpen(false);
                }}
                padding="0.5rem 1rem"
              >
                <Paragraph color="textPrimary">Branches</Paragraph>
              </Flex>

              <Flex
                justify="center"
                onClick={() => {
                  setMenuOpen(false);
                }}
                padding="0.5rem 1rem"
              >
                <Paragraph color="textPrimary">Track Order</Paragraph>
              </Flex>
              <Flex
                justify="center"
                onClick={() => {
                  setMenuOpen(false);

                  setAuthModalStatus?.({ mode: "login", open: true });
                }}
                padding="0.5rem 1rem"
              >
                <Paragraph color="textPrimary">Login</Paragraph>
              </Flex>
              <Flex
                justify="center"
                onClick={() => {
                  setMenuOpen(false);

                  handleToggleProfileModal?.();
                }}
                padding="0.5rem 1rem"
              >
                <Paragraph color="textPrimary">My Account</Paragraph>
              </Flex>

              {i18n.language === "en" && (
                <Flex
                  justify="center"
                  onClick={() => {
                    setMenuOpen(false);

                    changeLanguage("ar");
                  }}
                  padding="0.5rem 1rem"
                >
                  <Paragraph color="textPrimary">العربية</Paragraph>
                </Flex>
              )}
              {i18n.language === "ar" && (
                <Flex
                  justify="center"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(false);
                    changeLanguage("en");
                  }}
                  padding="0.5rem 1rem"
                >
                  <Paragraph color="textPrimary">English</Paragraph>
                </Flex>
              )}
            </Popover>
          </CSSTransition>
        </IconButton>
      )}
    </Container>
  );
};

export default NavIcons;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const IconButton = styled.button`
  padding: 0.25rem;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  color: #fff;
  &:hover {
    background-color: ${(props) => props.theme.primaryDarker};
  }
  border-radius: 50px;
`;
const OrderModeContainer = styled(FlexWrapper)`
  border-radius: 6px;
  overflow: hidden;
`;
