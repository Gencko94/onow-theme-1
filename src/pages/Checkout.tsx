import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import ContactInfo from '../components/Checkout/ContactInfo';
import Summary from '../components/Checkout/Summary';
import MobileHeader from '../components/Header/MobileHeader';
import Hero from '../components/Home/Hero/Hero';

import Layout from '../layout/Layout';

const Checkout = () => {
  const { path } = useRouteMatch();
  const location = useLocation();

  console.log(path);
  return (
    <Layout>
      <MobileHeader title="checkout" />
      <Container>
        <Switch location={location}>
          <Route exact path={path} component={ContactInfo} />
          <Route exact path={`/checkout/summary`} component={Summary} />
        </Switch>
      </Container>
    </Layout>
  );
};

export default Checkout;
const Container = styled.div`
  min-height: calc(100vh - 66px);
  position: relative;

  /* padding: 1rem; */
  overflow-x: hidden;
`;
const Title = styled.h1(
  ({ theme: { breakpoints } }) => `
  font-size: 1.875rem; 
  line-height: 2.25rem;
  text-align: center;
  margin-bottom: 1rem;
  color:#5F7999;
  @media ${breakpoints.xs} {
      font-size: 1.5rem;
      line-height: 2rem;
    }
  }
`
);
