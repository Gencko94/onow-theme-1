import { AnimatePresence, m } from 'framer-motion';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiChevronDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ApplicationProvider } from '../../../contexts/ApplicationContext';
import { ThemeContext } from '../../../contexts/ThemeContext';

const NavOrderMode = () => {
  const { t } = useTranslation();
  const { mode } = useContext(ThemeContext);
  const { globalOrderMode, deliveryAddress } = useContext(ApplicationProvider);
  const [orderModeOpen, setOrderModeOpen] = useState(false);
  return (
    <>
      {!globalOrderMode && (
        <Container
          mode={mode}
          onMouseEnter={() => setOrderModeOpen(true)}
          onMouseLeave={() => setOrderModeOpen(false)}
        >
          <IconText>{t('select-order-mode')}</IconText>
          <Icon>
            <FiChevronDown size={20} />
          </Icon>
          <AnimatePresence>
            {orderModeOpen && (
              <Menu
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                mode={mode}
              >
                <MenuItem to="/mode/delivery">{t('delivery')}</MenuItem>
                <MenuItem to="/mode/pickup">{t('pickup')}</MenuItem>
              </Menu>
            )}
          </AnimatePresence>
        </Container>
      )}
      {globalOrderMode && (
        <Container
          mode={mode}
          onMouseEnter={() => setOrderModeOpen(true)}
          onMouseLeave={() => setOrderModeOpen(false)}
        >
          {globalOrderMode === 'delivery' && (
            <IconText>
              {t('delivery-to')} {deliveryAddress?.area}
            </IconText>
          )}
          {globalOrderMode === 'pickup' && (
            <IconText>
              {t('pick-up-from')} {deliveryAddress?.area}
            </IconText>
          )}
          <Icon>
            <FiChevronDown size={20} />
          </Icon>
          <AnimatePresence>
            {orderModeOpen && (
              <Menu
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                mode={mode}
              >
                <MenuItem to="/mode/delivery">{t('change-mode')}</MenuItem>
              </Menu>
            )}
          </AnimatePresence>
        </Container>
      )}
    </>
  );
};

export default NavOrderMode;
const Container = styled.div<{ mode?: string }>`
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
const Menu = styled(m.div)<{ mode?: string }>`
  width: 100%;
  position: absolute;
  top: 110%;
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
  background: ${props => props.theme.overlayColor};
  text-align: center;
  padding: 0.5rem;
  /* transition: background 75ms ease; */
  &:hover {
    background: ${props => props.theme.highlightColor};
    color: ${props => props.theme.highlightColorText};
  }
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
