import React, { Dispatch, SetStateAction } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';
import { GiStarFormation } from 'react-icons/gi';
import { AiOutlineReload, AiOutlineUserAdd } from 'react-icons/ai';
import { BiLogIn } from 'react-icons/bi';
import { BiReceipt } from 'react-icons/bi';
import { Link } from 'react-router-dom';

interface IProps {
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}
const Drawer = ({ setDrawerOpen }: IProps) => {
  let topSectionRef = React.useRef<HTMLDivElement | null>(null);
  let linksRef = React.useRef<HTMLDivElement | null>(null);
  const tl = gsap.timeline();
  React.useEffect(() => {
    const menuLinks = topSectionRef.current?.lastElementChild;
    const logo = topSectionRef.current?.firstElementChild;
    const links = linksRef.current;
    if (menuLinks && logo && links) {
      tl.from(logo, {
        duration: 0.7,
        scale: 0,
        delay: 0.3,
        transformOrigin: 'center',
        ease: 'Back.easeOut',
      })
        .from(
          menuLinks.children,
          {
            duration: 0.4,
            y: 500,
            stagger: 0.1,
            opacity: 0,
            ease: 'Power4.easeOut',
          },
          '0.3'
        )
        .from(
          links.children,
          {
            duration: 0.4,
            y: 500,
            stagger: 0.1,
            opacity: 0,
            ease: 'Power4.easeOut',
          },
          '.3'
        );
    }
  }, []);
  const handleDrawerClose = () => {
    tl.reverse();
    setDrawerOpen(false);
  };
  return (
    <DrawerContainer>
      <TopSection ref={topSectionRef}>
        <LogoWrapper>
          <LogoContainer>
            <img src="/images/logo.png" alt="logo" />
          </LogoContainer>
        </LogoWrapper>
        <MenuContainer>
          <MenuLink to="/">
            <BiReceipt size={30} />
            <StyledP>Our Menu</StyledP>
          </MenuLink>
          <MenuLink to="/">
            <BiLogIn size={30} />
            <StyledP>Log in</StyledP>
          </MenuLink>
          <MenuLink to="/">
            <AiOutlineUserAdd size={30} />
            <StyledP>Sign up</StyledP>
          </MenuLink>
        </MenuContainer>
      </TopSection>
      <LinksContainer ref={linksRef}>
        <Linkitem to="/">Our Branches</Linkitem>
        <Linkitem to="/">Contact Us</Linkitem>
        <Linkitem to="/">About us</Linkitem>
        <Linkitem to="/">العربية</Linkitem>
      </LinksContainer>
    </DrawerContainer>
  );
};

export default Drawer;

const DrawerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  text-align: center;
  z-index: 9;
  background-color: #fff;
  height: 100%;
  width: 300px;
`;
const TopSection = styled.div`
  background-color: ${props => props.theme.mainColor};
  color: #fff;
  height: 200px;
  padding: 0.5rem;
`;
const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LogoContainer = styled.div`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  margin-bottom: 0.5rem;
`;
const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.25rem;
`;
const MenuLink = styled(Link)`
  display: flex;
  flex-direction: column;
  padding: 0.25em;
  justify-content: center;
  align-items: center;
`;
const StyledP = styled.p`
  margin-top: 0.25rem;
`;
const LinksContainer = styled.div`
  padding: 1rem 0.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
`;
const Linkitem = styled(Link)`
  display: block;
  font-size: 1.3rem;
  color: ${props => props.theme.secondaryColor};
`;
