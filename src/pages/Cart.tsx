import styled from 'styled-components';
import CartItems from '../components/Cart/CartItems/CartItems';
import CheckoutSection from '../components/Cart/CheckoutSection';
import MobileHeader from '../components/Header/MobileHeader';
import Layout from '../layout/Layout';

const Cart = () => {
  return (
    <Layout>
      <Container>
        <MobileHeader title="my-basket" />
        <Grid>
          <CartItems />
          <CheckoutSection />
        </Grid>
      </Container>
    </Layout>
  );
};

export default Cart;

const Container = styled.div`
  position: relative;
  /* margin-top: 66px; */
`;
const Grid = styled.div`
  /* display: grid; */
  height: 100%;
  /* position: relative; */
  /* grid-template-columns: 1fr; */
`;
