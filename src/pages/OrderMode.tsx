import { useState } from 'react';
import { Redirect, useParams } from 'react-router';
import styled from 'styled-components';
import MobileHeader from '../components/Header/MobileHeader';
import DeliveryMode from '../components/OrderMode/DeliveryMode/DeliveryMode';
import OrderModePicker from '../components/OrderMode/OrderModePicker/OrderModePicker';
import { OMode } from '../contexts/ApplicationContext';
import Layout from '../layout/Layout';

const OrderMode = () => {
  const { mode } = useParams<{ mode: string }>();
  const [orderMode, setOrderMode] = useState<OMode>(() => {
    return mode as OMode;
  });

  if (mode !== 'pickup' && mode !== 'delivery') {
    return <Redirect to="/mode/delivery" />;
  }
  return (
    <Layout>
      <MobileHeader title="order-mode" />
      <Container>
        <OrderModePicker orderMode={orderMode} setOrderMode={setOrderMode} />
        {orderMode === 'delivery' && <DeliveryMode />}
      </Container>
    </Layout>
  );
};

export default OrderMode;
const Container = styled.div(
  ({ theme: { breakpoints, headingColor } }) => `
  padding: 1rem 0.5rem;
  @media ${breakpoints.md}{
    padding: 1rem 0.75rem;
    max-width:960px;
  margin: 0 auto;
}
@media ${breakpoints.lg}{
  max-width:1100px;
  margin: 0 auto;
}
`
);
