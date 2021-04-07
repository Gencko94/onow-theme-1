import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import ContactInfo from '../components/Checkout/ContactInfo';
import DeliveryAddress from '../components/Checkout/DeliveryAddress';
import MobileHeader from '../components/Header/MobileHeader';
import { ApplicationProvider } from '../contexts/ApplicationContext';
import * as yup from 'yup';
import Layout from '../layout/Layout';
import { useTranslation } from 'react-i18next';
import { CHECKOUT_FORM } from '../interfaces/checkoutForm';
import { PAYMENT_METHOD } from '../interfaces/init';
import PaymentMethods from '../components/Checkout/PaymentMethods';
import CheckoutSummary from '../components/Checkout/CheckoutSummary';
import PickupDetails from '../components/Checkout/PickupDetails';

const Checkout = () => {
  const { deliveryAddress, globalOrderMode, pickupBranch } = useContext(
    ApplicationProvider
  );
  const { t } = useTranslation(['checkout']);
  const [paymentMethod, setPaymentMethod] = useState<PAYMENT_METHOD | null>(
    null
  );
  const schema = useMemo(
    () =>
      yup.object().shape({
        first_name: yup.string().required(t('required-field')).min(5),
        last_name: yup.string().required(t('required-field')).min(5),
        phone_number: yup.string().required(t('required-field')).min(5),
      }),
    []
  );
  const { register, handleSubmit, errors } = useForm<CHECKOUT_FORM>({
    resolver: yupResolver(schema),
    defaultValues: {
      additionalDirections: '',
      block: deliveryAddress?.block,
      building: deliveryAddress?.building,
      floor: deliveryAddress?.floor,
      street: deliveryAddress?.street,
    },
  });
  // console.log(errors);
  const onSubmit = (data: CHECKOUT_FORM) => {
    console.log(data);
  };
  return (
    <Layout>
      <MobileHeader title="checkout" />
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <SectionsContainer>
            <ContactInfo register={register} errors={errors} />
            {globalOrderMode === 'delivery' && (
              <DeliveryAddress register={register} errors={errors} />
            )}
            {globalOrderMode === 'pickup' && (
              <PickupDetails register={register} errors={errors} />
            )}
            <PaymentMethods
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          </SectionsContainer>
          <CheckoutSummary />
        </Form>
      </Container>
    </Layout>
  );
};

export default Checkout;
const Container = styled.div(
  ({ theme: { breakpoints, maxWidthLg, maxWidthMd } }) => `
  position: relative;
  // overflow:auto;
  min-height:calc(100vh - 150px);
  @media ${breakpoints.md}{
    max-width:${maxWidthMd};
    margin: 0 auto;
  }
  @media ${breakpoints.lg}{
    max-width:${maxWidthLg};
  }
  `
);
const Form = styled.form(
  ({ theme: { breakpoints, maxWidthLg, maxWidthMd } }) => `
  position: relative;
  display:flex;
  grid-template-columns:1fr 0.4fr;
  padding: 1rem 0.5rem;
  // gap:1rem;
  // overflow-x: hidden;
 
  `
);
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

const SectionsContainer = styled.div`
  width: 70%;
  flex: 1;
  margin: 0 0.75rem;
`;
