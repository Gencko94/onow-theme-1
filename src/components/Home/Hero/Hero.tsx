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
const Title = styled.h1(
  ({ theme: { breakpoints, headingColor } }) => `
  font-size: 1.875rem; 
  line-height: 2.25rem;
  text-align: center;
  margin-bottom: 2rem;
  color:${headingColor};
  @media ${breakpoints.xs} {
      font-size: 1.5rem;
      line-height: 2rem;
    }
  }
`
);
const HeroImageContainer = styled.div<{ image: string }>(
  ({ theme: { breakpoints, headingColor }, image }) => `
  background-image: url(${image});
  background-position: center !important;
  background-size: cover !important;
  filter: brightness(0.6);
  @media ${breakpoints.xs} {
    height: 175px;
  };
  @media ${breakpoints.md} {
    height: 200px;
  };
  @media ${breakpoints.lg} {
    height: 225px;
  };
`
);

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
