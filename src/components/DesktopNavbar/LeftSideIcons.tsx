import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiChevronDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { ThemeContext } from '../../contexts/ThemeContext';

const LeftSideIcons = () => {
  const { t } = useTranslation();
  const { mode } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Container>
      <IconContainer mode={mode} to="/login">
        <IconText>{t('login')}</IconText>
      </IconContainer>
      <AccountIconContainer
        mode={mode}
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
      >
        <IconText>{t('hello')} Maher</IconText>
        <Icon>
          <FiChevronDown size={20} />
        </Icon>
        <CSSTransition
          in={menuOpen}
          timeout={200}
          unmountOnExit
          classNames="account-menu"
        >
          <AccountMenu mode={mode}>
            <MenuItem to="/user/profile">{t('my-profile')}</MenuItem>
            <MenuItem to="/user/addresses">{t('my-addresses')}</MenuItem>
            <MenuItem to="/user/orders">{t('my-orders')}</MenuItem>
          </AccountMenu>
        </CSSTransition>
      </AccountIconContainer>
    </Container>
  );
};

export default LeftSideIcons;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Icon = styled.span`
  padding: 0 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.btnText};
`;
const IconContainer = styled(Link)<{ mode?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    props.mode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'none'};
  border-radius: 15px;
  padding: 0.5rem;
  margin: 0 0.25rem;
  transition: background-color 100ms;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const IconText = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: #fff;
  transition: color 250ms;
  font-weight: ${props => props.theme.font.bold};
  margin: 0 0.25rem;
`;
const AccountIconContainer = styled.div<{ mode?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: ${props =>
    props.mode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'none'};
  border-radius: 15px;
  padding: 0.5rem;
  margin: 0 0.25rem;
  transition: background-color 100ms;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;
const AccountMenu = styled.div<{ mode?: string }>`
  width: 100%;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 3;
  overflow: hidden;
  border: ${props =>
    props.mode === 'dark' ? `1px solid ${props.theme.btnBorder}` : 'none'};
  box-shadow: ${props =>
    props.mode === 'light' ? `${props.theme.shadow}` : 'none'};
  background-color: ${props => props.theme.overlayColor};
  border-radius: 8px;
`;
const MenuItem = styled(Link)`
  display: block;
  text-align: center;
  padding: 0.5rem;
  &:hover {
    background-color: ${props => props.theme.highlightColor};
    color: ${props => props.theme.highlightColorText};
  }
`;
