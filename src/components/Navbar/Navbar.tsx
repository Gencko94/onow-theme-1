import styled from "styled-components";
import useResponsive from "../../hooks/useResponsive";
import NavIcons from "../DesktopNavbar/NavIcons";
import Hamburger from "../MobileNavbar/MobileNavIcons/Hamburger";
import Flex, { FlexWrapper } from "../reusables/Flex";
import DeliveryLocationBar from "./DeliveryLocationBar";

const Navbar = () => {
  const { isDesktop } = useResponsive();
  return (
    <>
      <Container>
        <Flex justify="center">
          {!isDesktop && <Hamburger />}
          {isDesktop && (
            <div className="logo">
              <img src="/images/logo.png" />
            </div>
          )}
        </Flex>
        <DeliveryLocationBar />
        <NavIcons />
      </Container>
    </>
  );
};

export default Navbar;
const Container = styled.div(
  ({ theme: { breakpoints, mainColor } }) => `
    // display: flex;
    // align-items: center;
    background-color: ${mainColor};
    // justify-content: space-between;
    display:grid;
    grid-template-columns:50px 1fr 0.5fr;
    align-items:center;
    padding: 0.5rem;
    gap:0.5rem;
    
    .logo img {
      max-height: 50px;
    }
    @media ${breakpoints.md}{
      gap:1.5rem;
      grid-template-columns:150px 1fr 0.5fr;
        .logo img {
            max-height: 75px;
        }

    }
    `
);
