import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const MobileHeader = ({ title }: { title: string }) => {
  const { t } = useTranslation();
  return (
    <Container>
      <ContentContainer>
        <TextBlock>
          <StoreName>Rock House Sliders</StoreName>
          <Title>{t(title)}</Title>
        </TextBlock>
        <LogoWrapper>
          <LogoContainer>
            <img src="/images/logo.png" alt="logo" />
          </LogoContainer>
        </LogoWrapper>
      </ContentContainer>
    </Container>
  );
};

export default MobileHeader;
const Container = styled.div`
  padding: 0.5rem 0.25rem;
  background-color: ${props => props.theme.overlayColor};
`;
const ContentContainer = styled.div(
  ({ theme: { breakpoints } }) => `
  display: grid;
  grid-template-columns: 1fr 0.4fr;
  @media ${breakpoints.md}{
      max-width:1100px;
      margin:0 auto;
      padding: 0 .5rem;
  }
  `
);
const TextBlock = styled.div``;
const StoreName = styled.h5`
  margin: 0.5rem 0;
  color: ${props => props.theme.subHeading};
  font-weight: ${props => props.theme.font.bold};
`;
const Title = styled.h4`
  color: ${props => props.theme.headingColor};
  font-weight: ${props => props.theme.font.xbold};
`;
const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LogoContainer = styled.div`
  border-radius: 50%;
  width: 75px;
  height: 75px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  margin-bottom: 0.5rem;
`;
