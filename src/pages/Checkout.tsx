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

const Checkout = () => {
  const { deliveryAddress } = useContext(ApplicationProvider);
  const { t } = useTranslation();
  const [paymentMethod, setPaymentMethod] = useState<PAYMENT_METHOD | null>(
    null
  );
  const schema = useMemo(
    () =>
      yup.object().shape({
        name: yup.string().required(t('required-field')).min(5),
        phone: yup.string().required(t('required-field')).min(5),
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
  return (
    <Layout>
      <MobileHeader title="checkout" />
      <Container>
        <Form>
          <ContactInfo register={register} errors={errors} />
          <DeliveryAddress register={register} errors={errors} />
          <PaymentMethods
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        </Form>
      </Container>
    </Layout>
  );
};

export default Checkout;
const Container = styled.div(
  ({ theme: { breakpoints, maxWidthLg, maxWidthMd } }) => `
  min-height: calc(100vh - 66px);
  position: relative;
  display:grid;
  grid-template-columns:1fr 0.4fr;
   padding: 1rem 0; 
  overflow-x: hidden;
  @media ${breakpoints.md}{
    max-width:${maxWidthMd};
    margin: 0 auto;
  }
  @media ${breakpoints.lg}{
    max-width:${maxWidthLg};
  }
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
const Form = styled.form``;
