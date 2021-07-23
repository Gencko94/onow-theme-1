import { useContext, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import ContactInfo from "../components/Checkout/ContactInfo";
import DeliveryAddress from "../components/Checkout/DeliveryAddress";

import { ApplicationProvider } from "../contexts/ApplicationContext";

import { useTranslation } from "react-i18next";
import { CHECKOUT_FORM } from "../interfaces/checkoutForm";
import { PAYMENT_METHOD } from "../interfaces/init";
import PaymentMethods from "../components/Checkout/PaymentMethods";
import CheckoutSummary from "../components/Checkout/CheckoutSummary";
import PickupDetails from "../components/Checkout/PickupDetails";
import CartStepper from "../components/Cart/CartStepper";
import { OrderProvider } from "../contexts/OrderContext";

const Checkout = () => {
  const { deliveryAddress, globalOrderMode, pickupBranch } =
    useContext(OrderProvider);
  const { t } = useTranslation(["checkout"]);
  const [paymentMethod, setPaymentMethod] = useState<PAYMENT_METHOD | null>(
    null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CHECKOUT_FORM>({
    defaultValues: {
      additionalDirections: "",
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
    <Container>
      <CartStepper />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <SectionsContainer>
          <ContactInfo register={register} errors={errors} />
          {/* {globalOrderMode === "delivery" && (
            )} */}
          <DeliveryAddress register={register} errors={errors} />
          {globalOrderMode === "pickup" && (
            <PickupDetails register={register} errors={errors} />
          )}
          <PaymentMethods
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        </SectionsContainer>
        {/* <CheckoutSummary /> */}
      </Form>
    </Container>
  );
};

export default Checkout;
const Container = styled.div(
  ({ theme: { breakpoints, maxWidthLg, maxWidthMd } }) => `
  position: relative;
  min-height:calc(100vh - 150px);
 
  `
);
const Form = styled.form(
  ({ theme: { breakpoints, maxWidthLg, maxWidthMd } }) => `
  position: relative;
  display:flex;
  flex-wrap:wrap;
  // padding: 0.5rem .25rem;
  @media ${breakpoints.md}{
    
    // padding: 1rem 0.5rem;
  }
 
  `
);

const SectionsContainer = styled.div(
  ({ theme: { breakpoints } }) => `
  width: 100%;
  flex: 1;
  // margin: 0 0.5rem;
  @media ${breakpoints.md} {
    // margin: 0 0.75rem;
    width: 70%;
  }
  `
);
