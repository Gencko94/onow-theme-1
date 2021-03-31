import { useContext } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import CartItems from '../components/Cart/CartItems/CartItems';
import CheckoutSection from '../components/Cart/CheckoutSection';
import MobileHeader from '../components/Header/MobileHeader';
import { AuthProvider } from '../contexts/AuthContext';
import Layout from '../layout/Layout';
import { getCartItems, getGuestCartItems } from '../utils/queries';

const Cart = () => {
  const { user } = useContext(AuthProvider);
  const { data: userCart, isLoading: userCartLoading } = useQuery(
    ['cart', user],
    getCartItems,
    {
      enabled: Boolean(user),
    }
  );
  const { data: guestCart, isLoading: guestCartLoading } = useQuery(
    'guest-cart',
    getGuestCartItems,
    {
      enabled: !user,
    }
  );
  return (
    <Layout>
      <Container>
        <MobileHeader title="my-basket" />
        <Grid>
          <CartItems
            data={userCart ? userCart.products : guestCart?.products}
            isLoading={userCartLoading || guestCartLoading}
          />
        </Grid>
        <CheckoutSection
          isLoading={userCartLoading || guestCartLoading}
          data={userCart ? userCart : guestCart}
        />
      </Container>
    </Layout>
  );
};

export default Cart;

const Container = styled.div``;
const Grid = styled.div(
  ({ theme: { breakpoints } }) => `
   

  @media  ${breakpoints.md} {
    padding: 1rem 0.75rem;
    margin: 0 auto;
    max-width: 960px;
    display: grid;
    grid-template-columns: 1fr 0.5fr;
    gap: 1rem;
  }
  @media ${breakpoints.lg} {
    max-width: 1100px;
  }
 
`
);
