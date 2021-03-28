import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeContext } from '../../contexts/ThemeContext';

const RightSideIcons = () => {
  const { t } = useTranslation();
  const { mode } = useContext(ThemeContext);
  return (
    <Container>
      <IconContainer mode={mode} to="/menu">
        <IconText>{t('our-menu')}</IconText>
      </IconContainer>
      <IconContainer mode={mode} to="/branches">
        <IconText>{t('our-branches')}</IconText>
      </IconContainer>
      <IconContainer mode={mode} to="/cart">
        <IconText>{t('track-order')}</IconText>
      </IconContainer>
      <IconContainer mode={mode} to="/cart">
        <IconText>3.000 KD</IconText>
        <Icon>
          <HiOutlineShoppingBag size={20} color="#fff" />
        </Icon>
      </IconContainer>
    </Container>
  );
};

export default RightSideIcons;
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
`;
