import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { products } from '../../../data/products';
import CartItem from './CartItem';

const CartItems = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Qty>
        <QtyText>Items (3)</QtyText>
      </Qty>
      <ItemsWrapper>
        {products.map(product => (
          <CartItem product={product} key={product.slug} />
        ))}
      </ItemsWrapper>
    </Container>
  );
};

export default CartItems;

const Container = styled.div`
  background-color: ${props => props.theme.bodyColor};
`;
const TextWrapper = styled.div`
  padding: 0.5rem;
`;
const Qty = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem 0.75rem;
  background-color: rgba(203, 203, 203, 0.7);
`;
const QtyText = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.headingColor};
  font-weight: ${props => props.theme.font.bold};
`;

const ItemsWrapper = styled.div`
  padding: 0.5rem;
`;
