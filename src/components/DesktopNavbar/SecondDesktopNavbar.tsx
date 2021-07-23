import { m } from "framer-motion";
import styled from "styled-components";
import LeftSideIcons from "./LeftSideIcons";
import RightSideIcons from "./NavIcons";

const SecondDesktopNavbar = () => {
  return (
    <Container
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      exit={{ y: -100 }}
      transition={{ type: "tween" }}
    >
      <LeftSideIcons />
      <RightSideIcons />
    </Container>
  );
};

export default SecondDesktopNavbar;
const Container = styled(m.header)`
  font-weight: ${(props) => props.theme.font.regular};
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: fixed;

  top: 0;
  left: 0;
  width: 100%;
  padding: 0.5rem;

  z-index: 9;
  transition: all 100ms ease;

  background-color: ${(props) => props.theme.mainColor};
`;
