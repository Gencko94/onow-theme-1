import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { paymentMethods } from '../../data/paymentMethods';
import * as yup from 'yup';
import DeliveryAddress from './DeliveryAddress';
import OrderItems from './OrderItems';
import { CheckoutFormInputs } from '../../interfaces/checkoutForm';
import { useContext, useState } from 'react';
import { LocationT } from '../../interfaces/LocationTypes';
import OrderModeItem from '../Home/OrderMode/OrderModeItem';
import { orderModes } from '../../data/orderModes';
import { ApplicationProvider } from '../../contexts/ApplicationContext';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Pickup from './Pickup';
import { PaymentMethods } from '../../interfaces/paymentMethods';
import { useTranslation } from 'react-i18next';

const schema = yup.object().shape({
  name: yup.string().required('Required Field').min(5),
  phone: yup.string().required('Required Field').min(5),
});
const Summary = () => {
  const { t } = useTranslation(['checkout']);
  const [locationType, setLocationType] = useState<LocationT>('house');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>(
    paymentMethods[0]
  );
  const { register, handleSubmit, errors } = useForm<CheckoutFormInputs>({
    resolver: yupResolver(schema),
  });
  const { selectedOrderMode } = useContext(ApplicationProvider);
  const onSubmit = (data: CheckoutFormInputs) => {
    console.log(data);
  };

  return (
    <Container>
      {/* <Subtitle>Order Mode</Subtitle> */}
      {/* <GridContainer>
        {orderModes.map(orderMode => (
          <OrderModeItem small orderMode={orderMode} />
        ))}
      </GridContainer> */}
      <SwitchTransition mode="out-in">
        {selectedOrderMode === 'delivery' ? (
          <CSSTransition
            classNames="checkout-component"
            key="delivery"
            timeout={250}
          >
            <DeliveryAddress
              register={register}
              errors={errors}
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              locationType={locationType}
              setLocationType={setLocationType}
            />
          </CSSTransition>
        ) : (
          <CSSTransition
            classNames="checkout-component"
            key="pickup"
            timeout={250}
          >
            <Pickup />
          </CSSTransition>
        )}
      </SwitchTransition>
      <Box>
        <BoxHead>
          <Title>{t('payment')} </Title>
        </BoxHead>
        <Subtitle>{t('payment-prompt')} </Subtitle>
        <PaymentMethodsContainer>
          {paymentMethods.map(method => (
            <PaymentMethodItem
              active={paymentMethod.name === method.name}
              onClick={() => setPaymentMethod(method)}
              key={method.name}
            >
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
const Container = styled.div`
  position: relative;
`;
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
  background: ${props => props.theme.btnPrimaryLight};
  color: ${props => props.theme.btnText};
`;
const Subtitle = styled.p`
  text-align: center;
  /* font-size: 1.1rem; */
  /* margin-bottom: 0.5rem; */
  padding: 0.25rem;
  font-weight: ${props => props.theme.font.bold};
`;
const Box = styled.div`
  background-color: ${props => props.theme.overlayColor};
  border-radius: 12px;
  margin-bottom: 0.5rem;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;
const PaymentMethodsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem 0.5rem 0.5rem;
`;
const PaymentMethodItem = styled.div<{ active: boolean }>`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  padding: 0.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${props =>
    props.active ? props.theme.highlightColor : props.theme.inputColorLight};
  color: ${props =>
    props.active ? props.theme.highlightColorText : props.theme.subHeading};
`;
const PaymentMethodName = styled.p`
  font-size: 0.8rem;
  font-weight: ${props => props.theme.font.bold};
`;
const PaymentMethodImage = styled.img`
  width: 46px;
  height: 38px;
  margin: 0.25rem 0;
`;
