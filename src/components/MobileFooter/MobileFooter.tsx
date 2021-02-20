import {
  AiFillFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from 'react-icons/ai';
import { FaGooglePlay } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MobileFooter = () => {
  return (
    <Container>
      <LogoContainer>
        <Logo>
          <img src="/images/logo.png" alt="logo" />
        </Logo>
        <CopyRight>
          All Rights Reserved, &copy;{new Date().getFullYear()}
        </CopyRight>
      </LogoContainer>
      <GridContainer>
        <LinksContainer>
          <StyledLink to="/">Contact Us</StyledLink>
          <StyledLink to="/">Branches</StyledLink>
        </LinksContainer>
        <SocialLinksContainer>
          <StyledLink to="/">
            <AiFillFacebook size={25} color="#4267B2" />
          </StyledLink>
          <StyledLink to="/">
            <AiOutlineTwitter size={25} color="#00acee" />
          </StyledLink>
          <StyledLink to="/">
            <AiOutlineInstagram size={25} color="#833AB4" />
          </StyledLink>
          <StyledLink to="/">
            <FaGooglePlay size={25} color="#3bccff" />
          </StyledLink>
        </SocialLinksContainer>
      </GridContainer>
    </Container>
  );
};

export default MobileFooter;

const Container = styled.div`
  background: ${props => props.theme.mainColor};
  padding: 1rem 0.5rem;
  display: grid;
  grid-template-columns: 0.9fr 1fr;
  gap: 1rem;
  color: #fff;
`;

const Logo = styled.div`
  width: 75px;
  height: 75px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  margin-bottom: 1rem;
`;
const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;

const CopyRight = styled.p`
  font-size: 0.7rem;
  text-align: center;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;
const SocialLinksContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const StyledLink = styled(Link)`
  margin: 0 1rem;
  font-size: 0.8rem;
`;
