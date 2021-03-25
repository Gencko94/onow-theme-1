import { useContext } from 'react';
import styled from 'styled-components';
import { ApplicationProvider } from '../../../contexts/ApplicationContext';
import { useTranslation } from 'react-i18next';

const Introduction = () => {
  const { i18n } = useTranslation();

  const { store_name } = useContext(ApplicationProvider);

  return (
    <Container>
      <Title>{store_name?.[i18n.language]}</Title>
      <Quote>Try Once , Repeat Forever</Quote>
    </Container>
  );
};

export default Introduction;
const Container = styled.div`
  min-height: 100%;
  padding: 0.75rem 0.4rem;
  text-align: center;
`;
const Title = styled.h1`
  font-size: 1.975rem;
  margin-bottom: 0.75rem;
  color: ${props => props.theme.headingColor};
  font-weight: ${props => props.theme.font.xbold};
`;
const Quote = styled.q`
  font-size: 1.125rem /* 18px */;
  line-height: 1.75rem /* 28px */;
  display: block;
  margin-bottom: 0.75rem; /* 12px */
  color: ${props => props.theme.subHeading};
  font-weight: ${props => props.theme.font.bold};
`;
