import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import Hamburger from "./MobileNavIcons/Hamburger";
import MobileNavIcons from "./MobileNavIcons/MobileNavIcons";
import { m } from "framer-motion";

interface IProps {
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

const SecondMobileNavbar = ({ setDrawerOpen, drawerOpen }: IProps) => {
  return (
    <Container
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      exit={{ y: -100 }}
      transition={{ type: "tween" }}
    >
      <Hamburger />
      <MobileNavIcons />
    </Container>
  );
};

export default SecondMobileNavbar;

const Container = styled(m.header)`
  display: flex;
  align-items: center;
  position: fixed;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.5rem;
  z-index: 9;
  background-color: ${(props) => props.theme.mainColor};
`;
