import React, { Dispatch, SetStateAction, useContext } from 'react';
import styled from 'styled-components';
import { IoMdListBox } from 'react-icons/io';
import { BiGitBranch, BiFoodMenu } from 'react-icons/bi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { HiUserCircle } from 'react-icons/hi';
import { MdMail } from 'react-icons/md';
import {
  AiOutlineUnorderedList,
  AiFillInfoCircle,
  AiOutlinePoweroff,
  AiOutlineUserAdd,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import ThemeToggler from '../../../utils/ThemeToggler';
import { useTranslation } from 'react-i18next';
import { ApplicationProvider } from '../../../contexts/ApplicationContext';

interface IProps {
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}
const Drawer = ({ setDrawerOpen }: IProps) => {
  const { t, i18n } = useTranslation();
  const { user, is_user, store_name } = useContext(ApplicationProvider);
  let topSectionRef = React.useRef<HTMLDivElement | null>(null);
  let linksRef = React.useRef<HTMLDivElement | null>(null);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  return (
    <DrawerContainer rtl={i18n.language === 'ar'}>
      <TopSection ref={topSectionRef}>
        {is_user && (
          <NameWrapper>
            <Name>
              {t('hello')} {user?.name} !
            </Name>
            <PhoneNumber>{user?.phone}</PhoneNumber>
          </NameWrapper>
        )}
        {!is_user && (
          <NameWrapper>
            <Name>{store_name?.[i18n.language]}</Name>
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
          </NameWrapper>
        )}
        {/* <LogoWrapper>
          <LogoContainer>
            <img src="/images/logo.png" alt="logo" />
          </LogoContainer>
        </LogoWrapper> */}
      </TopSection>
      <hr />
      <LinksContainer ref={linksRef}>
        <LinkContainer>
          <BiFoodMenu size={30} color="#04b9aa" />

          <Linkitem to="/categories">{t('common:our-menu')}</Linkitem>
        </LinkContainer>
        <LinkContainer>
          <BiGitBranch size={30} color="#b99e04" />
          <Linkitem to="/branches">{t('common:our-branches')}</Linkitem>
        </LinkContainer>
        {is_user && (
          <>
            <LinkContainer>
              <HiUserCircle size={30} color="#dd321b" />
              <Linkitem to="/user/profile">{t('common:my-profile')}</Linkitem>
            </LinkContainer>
            <LinkContainer>
              <IoMdListBox size={30} color="#04b922" />
              <Linkitem to="/">{t('common:my-orders')}</Linkitem>
            </LinkContainer>
            <LinkContainer>
              <FaMapMarkerAlt size={30} color="#c11ce2" />
              <Linkitem to="/user/addresses">
                {t('common:my-addresses')}
              </Linkitem>
            </LinkContainer>
          </>
        )}
      </LinksContainer>
      <hr />
      <LinksContainer>
        <LinkContainer>
          <MdMail size={30} color="#3277f8" />
          <Linkitem to="/">{t('common:contact-us')}</Linkitem>
        </LinkContainer>
        <LinkContainer>
          <AiFillInfoCircle size={30} color="#29affc" />
          <Linkitem to="/">{t('common:about-us')}</Linkitem>
        </LinkContainer>
      </LinksContainer>
      <hr />
      <Toggler>
        <Text>{t('dark-mode')}</Text>
        <ThemeToggler />
      </Toggler>
    </DrawerContainer>
  );
};

export default Drawer;

const DrawerContainer = styled.div<{ rtl: boolean }>`
  position: fixed;
  top: 0;
  left: ${props => !props.rtl && '0'};
  right: ${props => props.rtl && '0'};
  overflow: hidden;
  z-index: 300;
  background-color: ${props => props.theme.bodyColor};
  height: 100%;
  width: 85%;
`;
const TopSection = styled.div`
  /* background-color: ${props => props.theme.mainColor}; */
  color: #fff;
  margin-top: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* height: 200px; */
  padding: 1rem;
`;
const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NameWrapper = styled.div``;
const LogoContainer = styled.div`
  border-radius: 50%;
  width: 75px;
  height: 75px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  margin-bottom: 0.5rem;
`;
const Name = styled.h4(
  ({ theme: { breakpoints, headingColor } }) => `

  font-size:1.3rem;
  color: ${headingColor};
  margin-bottom: 0.25rem;
  
`
);

const PhoneNumber = styled.p`
  color: ${props => props.theme.subHeading};
  font-weight: ${props => props.theme.font.regular};
`;
const LinksContainer = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
`;
const LinkContainer = styled.div`
  color: ${props => props.theme.headingColor};
  display: flex;
  align-items: center;
  font-weight: ${props => props.theme.font.regular};
  margin: 0.25rem 0;
`;
const Linkitem = styled(Link)`
  display: block;
  font-size: 1.2rem;
  margin: 0 1rem;
`;
const Toggler = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;
const Text = styled.span`
  margin: 0 0.25rem;
  font-size: 1.2rem;
  color: ${props => props.theme.headingColor};
`;
const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.75rem;
  /* padding: 1rem; */
`;
const Button = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin: 0 0.25rem; */
  border: ${props => props.theme.btnBorder};
  text-decoration: underline;
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
  /* background-color: ${props => props.theme.btnPrimaryLight}; */
  color: ${props => props.theme.subHeading};
  border-radius: 5px;
  font-weight: ${props => props.theme.font.semibold};
  /* width: 115px; */
`;
