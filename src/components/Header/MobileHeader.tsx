import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ApplicationProvider } from '../../contexts/ApplicationContext';

const MobileHeader = ({ title }: { title: string }) => {
  const { t, i18n } = useTranslation();
  const { store_name } = useContext(ApplicationProvider);
  const history = useHistory();
  return (
    <Container>
      <ContentContainer>
        <TextBlock>
          <StoreName>{store_name?.[i18n.language]}</StoreName>
          <Title>{t(title)}</Title>
          <GoBack onClick={() => history.goBack()}>{t('go-back')}</GoBack>
        </TextBlock>
        <LogoWrapper>
          <LogoContainer to="/">
            <img src="/images/logo.png" alt="logo" />
          </LogoContainer>
        </LogoWrapper>
      </ContentContainer>
    </Container>
  );
};

export default MobileHeader;
const Container = styled.div`
  padding: 0.5rem;
  background-color: ${props => props.theme.overlayColor};
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const ContentContainer = styled.div(
  ({ theme: { breakpoints } }) => `
  display: grid;
  grid-template-columns: 1fr 0.4fr;
  @media ${breakpoints.md}{
      max-width:960px;
      margin:0 auto;
      padding: 0 .5rem;
  }
  @media ${breakpoints.lg}{
      max-width:1100px;
      margin:0 auto;
      padding: 0 .5rem;
  }
  `
);
const TextBlock = styled.div``;
const StoreName = styled.h5(
  ({ theme: { breakpoints, subHeading, font } }) => `
  margin: 0.25rem 0;
  color: ${subHeading};
  font-weight: ${font.bold};
  font-size:1.1rem;
  @media ${breakpoints.md}{
    font-size: 1.25rem;
    margin: 0.5rem 0;
  }
`
);

const Title = styled.h4(
  ({ theme: { breakpoints, headingColor, font } }) => `
  margin: 0.5rem 0;
  color: ${headingColor};
  font-weight: ${font.xbold};
  font-size:1.25rem;
  @media ${breakpoints.md}{
    font-size: 1.5rem;
    margin: 0.75rem 0;
  }
`
);
const LogoWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const LogoContainer = styled(Link)`
  border-radius: 50%;
  width: 75px;
  height: 75px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  margin-bottom: 0.5rem;
`;
const GoBack = styled.button`
  padding: 0.25rem 0.5rem;
  font-size: 0.9rem;
  background-color: ${props => props.theme.btnPrimaryLight};
  color: ${props => props.theme.btnText};
  border: ${props => props.theme.btnBorder};
  border-radius: 6px;
`;
