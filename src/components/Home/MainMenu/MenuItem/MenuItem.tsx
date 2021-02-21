import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface IProps {
  menu: {
    title: string;
    icon?: any;
    link: string;
  };
}

const MenuItem = ({ menu }: IProps) => {
  return (
    <Container to={menu.link}>
      <IconContainer>{menu.icon}</IconContainer>
      <TitleContainer>
        <Title>{menu.title}</Title>
      </TitleContainer>
    </Container>
  );
};

export default MenuItem;

const Container = styled(Link)`
  border-radius: 8px;
  padding: 1rem;
  display: block;
  color: #fff;
  background-color: ${props => props.theme.mainColor};
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
`;
const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem; /* 10px */
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.p`
  font-size: 0.9rem;
  text-align: center;
`;
