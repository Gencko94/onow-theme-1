import { useQuery } from 'react-query';
import styled from 'styled-components';
import CartItems from '../components/Cart/CartItems/CartItems';
import CheckoutSection from '../components/Cart/CheckoutSection';
import MobileHeader from '../components/Header/MobileHeader';
import Layout from '../layout/Layout';
import { getCartItems } from '../utils/queries';

const Cart = () => {
  const { data, isLoading } = useQuery('cart', getCartItems);
  return (
    <Layout>
      <Container>
        <MobileHeader title="my-basket" />
        <Grid>
          <CartItems data={data} isLoading={isLoading} />
        </Grid>
        <CheckoutSection isLoading={isLoading} data={data} />
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
