import { useTranslation } from 'react-i18next';
import { BiArrowBack } from 'react-icons/bi';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const BackNav = ({ title }: { title: string }) => {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <Container>
      <Icon onClick={() => history.goBack()}>
        <BiArrowBack size={25} />
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
  padding: 0.5rem;
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
