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
          {/* add appear animation */}
          {data && <CheckoutSection />}
        </Grid>
      </Container>
    </Layout>
  );
};

export default Cart;

const Container = styled.div`
  /* position: relative; */
  /* margin-top: 66px; */
`;
const Grid = styled.div`
  height: 100%;
  @media (min-width: 768px) {
    margin: 0 auto;
    max-width: 1100px;
    display: grid;
    grid-template-columns: 1fr 0.5fr;
    gap: 1rem;
    padding: 1rem 0.5rem;
  }
  /* position: relative; */
`;
