import styled from 'styled-components';

import { PaymentMethods } from '../../interfaces/paymentMethods';
import OrderItems from './OrderItems';
const PaymentMethod = () => {
  const paymentMethods: PaymentMethods[] = [
    { name: 'K-net', photo: '/images/knet.png' },
    { name: 'MasterCard', photo: '/images/mastercard.png' },
    { name: 'Bookey', photo: '/images/bookey.png' },
  ];

  return (
    <Container>
      <Box>
        <Title>Payment</Title>
        <SmallTitle>Select you preffered payment method</SmallTitle>
        <PaymentMethodsContainer>
          {paymentMethods.map(method => (
            <PaymentMethodItem key={method.name}>
              <PaymentMethodName>{method.name}</PaymentMethodName>
              <PaymentMethodImage src={method.photo} alt={method.name} />
            </PaymentMethodItem>
          ))}
        </PaymentMethodsContainer>
      </Box>

      <OrderItems />
    </Container>
  );
};

export default PaymentMethod;
const Container = styled.div``;
const Title = styled.h5(
  ({ theme: { breakpoints } }) => `

  text-align: center;
  margin-bottom: 1rem;
 
  @media ${breakpoints.xs} {
     
    }
  }
`
);
const SmallTitle = styled.p`
  text-align: center;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;
const Box = styled.div`
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 12px;
  margin-bottom: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;
const PaymentMethodsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
`;
const PaymentMethodItem = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  padding: 0.25rem;
  justify-content: space-evenly;
  align-items: center;
`;
const PaymentMethodName = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
`;
const PaymentMethodImage = styled.img`
  width: 46px;
  height: 38px;
  margin: 0 0.5rem;
`;
