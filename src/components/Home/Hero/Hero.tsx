import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Hero = () => {
  return (
    <Container className="relative">
      <HeroImageContainer image="/images/hero.jpg" />
      <LogoContainer to="/">
        <img src="/images/logo.png" alt="logo" />
      </LogoContainer>
    </Container>
  );
};

export default Hero;
const Container = styled.div`
  position: relative;
`;

const HeroImageContainer = styled.div<{ image: string }>`
  background-image: url(${props => props.image});
  height: 175px;
  background-position: center !important;
  background-size: cover !important;
  filter: brightness(0.6); ;
`;

const LogoContainer = styled(Link)`
  position: absolute;
  display: block;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 125px;
  height: 125px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
  border-radius: 50%;
`;
