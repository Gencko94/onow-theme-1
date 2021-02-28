import styled from 'styled-components';
import Map from '../components/GoogleMap/Map';

import Layout from '../layout/Layout';

const Checkout = () => {
  return (
    <Layout>
      <Container>
        <Map />
      </Container>
    </Layout>
  );
};

export default Checkout;
const Container = styled.div`
  margin-top: 66px;
  height: calc(100vh - 66px);
  position: relative;
`;
