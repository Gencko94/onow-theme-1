import React, { Dispatch, SetStateAction } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';
import { IoMdListBox } from 'react-icons/io';
import { BiGitBranch } from 'react-icons/bi';
import { HiOutlineMail } from 'react-icons/hi';
import { BsGearFill } from 'react-icons/bs';
import {
  AiOutlineUnorderedList,
  AiFillInfoCircle,
  AiOutlinePoweroff,
  AiOutlineUserAdd,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import ThemeToggler from '../../../utils/ThemeToggler';
import { useTranslation } from 'react-i18next';

interface IProps {
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}
const Drawer = ({ setDrawerOpen }: IProps) => {
  const { t } = useTranslation();
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
            x: 500,
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
        <Name>Hello Maher !</Name>
        <PhoneNumber>+96550678621</PhoneNumber>
      </TopSection>
      <LinksContainer ref={linksRef}>
        <LinkContainer>
          <IoMdListBox size={20} />

          <Linkitem to="/categories">{t('common:our-menu')}</Linkitem>
        </LinkContainer>
        <LinkContainer>
          <BiGitBranch size={20} />
          <Linkitem to="/">{t('common:our-branches')}</Linkitem>
        </LinkContainer>
        <LinkContainer>
          <AiOutlineUnorderedList size={20} />
          <Linkitem to="/">{t('common:my-orders')}</Linkitem>
        </LinkContainer>
        <LinkContainer>
          <HiOutlineMail size={20} />
          <Linkitem to="/">{t('common:contact-us')}</Linkitem>
        </LinkContainer>
        <LinkContainer>
          <AiFillInfoCircle size={20} />
          <Linkitem to="/">{t('common:about-us')}</Linkitem>
        </LinkContainer>
        <LinkContainer>
          <BsGearFill size={20} />
          <Linkitem to="/">{t('common:settings')}</Linkitem>
        </LinkContainer>

        <Toggler>
          <Text>Toggle Theme</Text>
          <ThemeToggler />
        </Toggler>
      </LinksContainer>
      <ButtonsContainer>
        <Button to="/login">
          <AiOutlinePoweroff size={20} />
          <Text>Login</Text>
        </Button>
        <Button to="/register">
          <AiOutlineUserAdd size={20} />
          <Text>Register</Text>
        </Button>
      </ButtonsContainer>
    </DrawerContainer>
  );
};

export default Drawer;

const DrawerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 300;
  background-color: ${props => props.theme.bodyColor};
  height: 100%;
  width: 85%;
`;
const TopSection = styled.div`
  /* background-color: ${props => props.theme.mainColor}; */
  color: #fff;
  /* height: 200px; */
  padding: 1rem;
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
const Name = styled.h4`
  color: ${props => props.theme.headingColor};
  margin-bottom: 0.25rem;
`;

const PhoneNumber = styled.p`
  color: ${props => props.theme.subHeading};
  font-weight: ${props => props.theme.font.bold};
`;
const LinksContainer = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
`;
const LinkContainer = styled.div`
  color: ${props => props.theme.subHeading};
  display: flex;
  align-items: center;
  font-weight: ${props => props.theme.font.bold};
`;
const Linkitem = styled(Link)`
  display: block;
  font-size: 1.2rem;
  margin: 0 0.5rem;
`;
const Toggler = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Text = styled.span`
  margin: 0 0.25rem;
`;
const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  padding: 1rem;
`;
const Button = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.25rem;
  padding: 0.75rem;
  background-color: ${props => props.theme.btnPrimaryLight};
  color: ${props => props.theme.btnText};
  border-radius: 19px;
  font-weight: ${props => props.theme.font.bold};
  width: 115px;
`;
