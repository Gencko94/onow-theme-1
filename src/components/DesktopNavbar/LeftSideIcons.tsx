import { AnimatePresence, m } from 'framer-motion';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiChevronDown } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ApplicationProvider } from '../../contexts/ApplicationContext';
import { ThemeContext } from '../../contexts/ThemeContext';

const LeftSideIcons = () => {
  const { user, is_user } = useContext(ApplicationProvider);
  const { t } = useTranslation();
  const { mode } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const history = useHistory();
  return (
    <Container>
      {!is_user && (
        <IconContainer mode={mode} to="/login">
          <IconText>{t('login')}</IconText>
        </IconContainer>
      )}
      {is_user && (
        <AccountIconContainer
          mode={mode}
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
        >
          <IconText>
            {t('hello')} {user?.name}
          </IconText>
          <Icon>
            <FiChevronDown size={20} />
          </Icon>
          <AnimatePresence>
            {menuOpen && (
              <AccountMenu
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                mode={mode}
              >
                <MenuItem to="/user/profile">{t('my-profile')}</MenuItem>
                <MenuItem to="/user/addresses">{t('my-addresses')}</MenuItem>
                <MenuItem to="/user/orders">{t('my-orders')}</MenuItem>
              </AccountMenu>
            )}
          </AnimatePresence>
        </AccountIconContainer>
      )}
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
const AccountMenu = styled(m.div)<{ mode?: string }>`
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
