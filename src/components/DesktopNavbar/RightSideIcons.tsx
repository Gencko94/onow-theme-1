import { HiOutlineShoppingBag } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const RightSideIcons = () => {
  return (
    <Container>
      <IconContainer to="/cart">
        <IconText>Our Menu</IconText>
      </IconContainer>
      <IconContainer to="/cart">
        <IconText>Track Order</IconText>
      </IconContainer>
      <IconContainer to="/cart">
        <IconText>3.000 KD</IconText>
        <Icon>
          <HiOutlineShoppingBag size={20} color="#fff" />
        </Icon>
      </IconContainer>
    </Container>
  );
};

export default RightSideIcons;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Icon = styled.span`
  padding: 0 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const IconContainer = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  padding: 0.5rem;
  margin: 0 0.25rem;
  transition: background-color 100ms;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const IconText = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: #fff;
  transition: color 250ms;
  font-weight: ${props => props.theme.font.bold};
`;
