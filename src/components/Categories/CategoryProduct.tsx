import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Product } from '../../interfaces/product';
import LazyImage from '../../utils/LazyImage';

interface IProps {
  product: Product;
}

const CategoryProduct = ({ product }: IProps) => {
  const history = useHistory();

  return (
    <Container onClick={() => history.push(`/products/${product.slug}`)}>
      <LazyImage src={product.image} alt={product.name} pb="90%" />
      <ContentContainer>
        <Price>{product.price}</Price>
        <NameContainer>
          <Name>{product.name}</Name>
        </NameContainer>
      </ContentContainer>
    </Container>
  );
};

export default CategoryProduct;

const Container = styled.div`
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
`;
const ContentContainer = styled.div`
  padding: 0 0.5rem 0.5rem 0.5rem;
`;
const NameContainer = styled.div`
  color: ${props => props.theme.secondaryColor};

  height: 38px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Name = styled.p`
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
`;
const Price = styled.p`
  text-align: center;
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: ${props => props.theme.mainColor};
`;

const OrderButton = styled.button`
  border-radius: 20px;
  background-color: ${props => props.theme.mainColor};
  padding: 0.25rem 0.5rem;
  color: #fff;
  margin: 0 auto;
  display: block;
`;
