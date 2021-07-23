import { useContext } from "react";
import { useMemo } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import { ApplicationProvider } from "../../contexts/ApplicationContext";
import Flex, { FlexWrapper } from "../reusables/Flex";
import LeftSideIcons from "./LeftSideIcons";
import RightSideIcons from "./NavIcons";

const DesktopNavbar = () => {
  const { pathname } = useLocation();
  // const { categories } = useContext(ApplicationProvider);
  const isTransparent = useMemo(() => {
    if (
      pathname === "/" ||
      pathname.includes("menu") ||
      pathname.includes("booking")
    )
      return true;
    return false;
  }, [pathname]);

  return (
    <>
      <Container isTransparent={isTransparent}>
        <LeftSideIcons />
        <RightSideIcons />
      </Container>
    </>
  );
};

export default DesktopNavbar;
const Container = styled.header<{
  isTransparent: boolean;
}>(
  ({ theme: { font, mainColor }, isTransparent }) => `
  font-weight: ${font.regular};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: ${isTransparent ? "absolute" : ""};
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.5rem;
  
  z-index: 9;
  transition: all 100ms ease;
  background-color: ${isTransparent ? "transparent" : mainColor};
    `
);
const Categories = styled(FlexWrapper)`
  background-color: #fff;
  justify-content: center;
  .category-item {
    padding: 0.75rem 1rem;
    &:hover {
      background-color: ${(props) => props.theme.accentColor};
    }
  }
`;
