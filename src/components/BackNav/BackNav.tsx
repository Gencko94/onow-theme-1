import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { UserInfoProvider } from '../../contexts/UserInfoContext';

const BackNav = ({ title, target }: { title: string; target?: string }) => {
  const { t, i18n } = useTranslation();

  const history = useHistory();
  return (
    <Container>
      <Icon
        onClick={() => {
          // if (target === 'mapEdit') {
          //   history.push('/user/addresses');
          // } else if (target === 'addAddress') {
          //   history.push('/address/add');
          // } else {
          history.goBack();
          // }
        }}
      >
        {i18n.language === 'ar' ? (
          <AiOutlineArrowRight size={25} />
        ) : (
          <AiOutlineArrowLeft size={25} />
        )}
      </Icon>
      <TitleContainer>
        <Title>{t(title)}</Title>
      </TitleContainer>
    </Container>
  );
};

export default BackNav;
const Container = styled.div`
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.75rem;
  z-index: 9;
  background-color: ${props => props.theme.navColor};
`;
const Icon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const Title = styled.h6``;
