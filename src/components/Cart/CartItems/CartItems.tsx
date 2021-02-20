import styled from 'styled-components';
import { products } from '../../../data/products';
import CartItem from './CartItem';

const CartItems = () => {
  return (
    <Container>
      <TextWrapper>
        <StyledH4>Your Cart</StyledH4>
      </TextWrapper>
      <ItemsWrapper>
        {products.map(product => (
          <CartItem product={product} key={product.slug} />
        ))}
      </ItemsWrapper>
    </Container>
  );
};

export default CartItems;

const Container = styled.div``;
const TextWrapper = styled.div`
  padding: 0.5rem;
`;
const StyledH4 = styled.h4``;

const ItemsWrapper = styled.div`
  padding: 0.5rem;
`;
