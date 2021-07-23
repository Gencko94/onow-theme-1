import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiChevronDown } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ApplicationProvider } from "../../contexts/ApplicationContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import useResponsive from "../../hooks/useResponsive";
import Paragraph from "../reusables/Paragraph";
import { CSSTransition } from "react-transition-group";
import Popover from "../reusables/Popover";
import Button from "../reusables/Button";
import { RiDeleteBinLine } from "react-icons/ri";
import Flex, { FlexWrapper } from "../reusables/Flex";
const NavIcons = () => {
  const { t } = useTranslation();
  const { mode } = useContext(ThemeContext);
  const {
    setAuthModalStatus,
    handleToggleProfileModal,
    handleToggleCartModal,
  } = useContext(ApplicationProvider);
  const { isDesktop } = useResponsive();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Container>
      {/* {isDesktop && (
        <>
          <LinkItem mode={mode} to="/menu">
            <Paragraph fontSize="0.9rem" color="textPrimaryContrast">
              {t("our-menu")}
            </Paragraph>
          </LinkItem>
          <LinkItem mode={mode} to="/branches">
            <Paragraph fontSize="0.9rem" color="textPrimaryContrast">
              {t("our-branches")}
            </Paragraph>
          </LinkItem>
          <LinkItem mode={mode} to="/cart">
            <Paragraph fontSize="0.9rem" color="textPrimaryContrast">
              {t("track-order")}
            </Paragraph>
          </LinkItem>
        </>
      )} */}
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
      {/* <LinkItem mode={mode} to="/cart">
        <Paragraph fontSize="0.9rem" color="textPrimaryContrast">
          3.000 KD
        </Paragraph>
        <Icon as={"button"}>
          <HiOutlineShoppingBag size={20} color="#fff" />
        </Icon>
      </LinkItem> */}
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
            setMenuOpen(true);
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
              <Button
                width="100%"
                text="Branches"
                padding="0.5rem 1rem"
                bg="accent1"
                // textSize="0.9rem"
                // Icon={RiDeleteBinLine}
                iconSize={15}
                onClick={(e) => {
                  setMenuOpen(false);
                  e.stopPropagation();
                }}
              />
              <Button
                width="100%"
                text="Order Track"
                padding="0.5rem 1rem"
                bg="accent1"
                iconSize={15}
                onClick={(e) => {
                  setMenuOpen(false);
                  e.stopPropagation();
                }}
              />

              <Button
                width="100%"
                text="Login"
                padding="0.5rem 1rem"
                bg="accent1"
                iconSize={15}
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  setAuthModalStatus?.({
                    mode: "login",
                    open: true,
                  });
                }}
              />
              <Button
                width="100%"
                text="My Account"
                padding="0.5rem 1rem"
                bg="accent1"
                iconSize={15}
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  handleToggleProfileModal?.();
                }}
              />
              <Button
                width="100%"
                text="العربية"
                padding="0.5rem 1rem"
                bg="accent1"
                iconSize={15}
                onClick={(e) => {
                  setMenuOpen(false);
                  e.stopPropagation();
                }}
              />
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
const Icon = styled.span`
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LinkItem = styled(Link)<{ mode?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.mode === "dark" ? "rgba(0, 0, 0, 0.2)" : "none"};
  border-radius: 15px;
  padding: 0.5rem;
  margin: 0 0.25rem;
  transition: background-color 100ms;
  &:hover {
    /* background-color: rgba(0, 0, 0, 0.3); */
    background-color: ${(props) => props.theme.primaryDarker};
  }
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
