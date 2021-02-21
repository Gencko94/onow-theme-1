import React from 'react';
import { useTranslation } from 'react-i18next';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MobileNavIcons = () => {
  const { i18n, ready } = useTranslation();
  const language = React.useMemo(() => {
    if (ready) {
      return i18n.language;
    }
  }, [ready, i18n.language]);
  const changeLanguage = (lng: string) => {
    if (ready) {
      i18n.changeLanguage(lng);
    }
  };
  return (
    <Container>
      {/* <div className="">
        {language === 'ar' && (
          <LanguageButton onClick={() => changeLanguage('en')}>
            English
          </LanguageButton>
        )}
        {language === 'en' && (
          <LanguageButton onClick={() => changeLanguage('ar')}>
            العربية
          </LanguageButton>
        )}
      </div> */}
      <Icon to="/cart">
        <HiOutlineShoppingBag size={30} color="#fff" />
      </Icon>
    </Container>
  );
};

export default MobileNavIcons;
const Container = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Icon = styled(Link)`
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LanguageButton = styled.button`
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
`;
