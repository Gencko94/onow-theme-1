import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const MobileHeader = ({ title }: { title: string }) => {
  const { t } = useTranslation();
  return (
    <Container>
      <TextBlock>
        <StoreName>Rock House Sliders</StoreName>
        <Title>{t(title)}</Title>
      </TextBlock>
      <LogoWrapper>
        <LogoContainer>
          <img src="/images/logo.png" alt="logo" />
        </LogoContainer>
      </LogoWrapper>
    </Container>
  );
};

export default MobileHeader;
const Container = styled.div`
  padding: 0.5rem 0.75rem;
  background-color: ${props => props.theme.overlayColor};
  display: grid;
  grid-template-columns: 1fr 0.4fr;
`;
const TextBlock = styled.div``;
const StoreName = styled.h5`
  margin: 1rem 0;
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
  width: 100px;
  height: 100px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  margin-bottom: 0.5rem;
`;
