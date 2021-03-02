import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { paymentMethods } from '../../data/paymentMethods';
import * as yup from 'yup';
import DeliveryAddress from './DeliveryAddress';
import OrderItems from './OrderItems';
import { CheckoutFormInputs } from '../../interfaces/checkoutForm';
import { useState } from 'react';
import { LocationT } from '../../interfaces/LocationTypes';
import OrderModeItem from '../Home/OrderMode/OrderModeItem';
import { orderModes } from '../../data/orderModes';

const schema = yup.object().shape({
  name: yup.string().required('Required Field').min(5),
  phone: yup.string().required('Required Field').min(5),
});
const Summary = () => {
  const [locationType, setLocationType] = useState<LocationT>('House');
  const { register, handleSubmit, errors } = useForm<CheckoutFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: CheckoutFormInputs) => {
    const info = {
      ...data,
    };
    console.log(data);
  };
  return (
    <Container>
      <Subtitle>Order Mode</Subtitle>
      <GridContainer>
        {orderModes.map(orderMode => (
          <OrderModeItem small orderMode={orderMode} />
        ))}
      </GridContainer>
      <DeliveryAddress
        register={register}
        errors={errors}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        locationType={locationType}
      />
      <Box>
        <BoxHead>
          <Title>Payment</Title>
          <Subtitle>Select you preffered payment method</Subtitle>
        </BoxHead>
        <PaymentMethodsContainer>
          {paymentMethods.map(method => (
            <PaymentMethodItem key={method.name}>
              <PaymentMethodImage src={method.photo} alt={method.name} />
              <PaymentMethodName>{method.name}</PaymentMethodName>
            </PaymentMethodItem>
          ))}
        </PaymentMethodsContainer>
      </Box>

      <OrderItems />
    </Container>
  );
};

export default Summary;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
`;
const Container = styled.div``;
const Title = styled.h5(
  ({ theme: { breakpoints } }) => `
 
  text-align: center;
 
 
  @media ${breakpoints.xs} {
     
    }
  }
`
);
const BoxHead = styled.div`
  padding: 0.5rem;
`;
const Subtitle = styled.p`
  text-align: center;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;
const Box = styled.div`
  background-color: #fff;
  border-radius: 12px;
  margin-bottom: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;
const PaymentMethodsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5rem;
  padding: 0.5rem;
`;
const PaymentMethodItem = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  padding: 0.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const PaymentMethodName = styled.p`
  font-size: 0.8rem;
  font-weight: 500;
`;
const PaymentMethodImage = styled.img`
  width: 46px;
  height: 38px;
  margin: 0.25rem 0;
`;
