import { useTranslation } from 'react-i18next';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MobileNavIcons = () => {
  const { i18n, ready } = useTranslation();

  const changeLanguage = (lng: string) => {
    if (ready) {
      i18n.changeLanguage(lng);
    }
  };
  return (
    <Container>
      <div>
        {i18n.language === 'ar' && (
          <LanguageButton onClick={() => changeLanguage('en')}>
            English
          </LanguageButton>
        )}
        {i18n.language === 'en' && (
          <LanguageButton onClick={() => changeLanguage('ar')}>
            العربية
          </LanguageButton>
        )}
      </div>
      <CartIconContainer to="/cart">
        <CartTotal>3.000 KD</CartTotal>
        <Icon>
          <HiOutlineShoppingBag size={20} color="#fff" />
        </Icon>
      </CartIconContainer>
    </Container>
  );
};

export default MobileNavIcons;
const Container = styled.div`
  /* margin-left: auto; */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;
const Icon = styled.span`
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LanguageButton = styled.button`
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
  color: #fff;
`;
const CartIconContainer = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  padding: 0.25rem 0.5rem;
`;

const CartTotal = styled.p`
  text-align: center;
  font-size: 0.8rem;

  color: #fff;
  transition: color 250ms;
  font-weight: ${props => props.theme.font.bold};
`;
