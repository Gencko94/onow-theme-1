import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import ContactInfo from '../components/Checkout/ContactInfo';
import PaymentMethod from '../components/Checkout/PaymentMethod';
import Hero from '../components/Home/Hero/Hero';

import Layout from '../layout/Layout';

const Checkout = () => {
  const { path } = useRouteMatch();
  const location = useLocation();

  console.log(path);
  return (
    <Layout>
      <Hero />
      <Container>
        <Title>Checkout</Title>

        <Switch location={location}>
          <Route exact path={path} component={ContactInfo} />
          <Route exact path={`/checkout/payment`} component={PaymentMethod} />
        </Switch>
      </Container>
    </Layout>
  );
};

export default Checkout;
const Container = styled.div`
  min-height: calc(100vh - 66px);
  position: relative;
  margin-top: 58px;
  padding: 1rem;
  overflow-x: hidden;
`;
const Title = styled.h1(
  ({ theme: { breakpoints } }) => `
  font-size: 1.875rem; 
  line-height: 2.25rem;
  text-align: center;
  margin-bottom: 2rem;
  color:#5F7999;
  @media ${breakpoints.xs} {
      font-size: 1.5rem;
      line-height: 2rem;
    }
  }
`
);
