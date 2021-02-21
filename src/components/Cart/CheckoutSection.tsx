import { BiChevronRight } from 'react-icons/bi';
import styled from 'styled-components';
const CheckoutSection = () => {
  return (
    <>
      <Container>
        <CouponContainer>
          <CouponInput placeholder="Enter Code Or Coupon" />
          <SubmitButton type="button">Submit</SubmitButton>
        </CouponContainer>
        <ContentWrapper>
          <OrderModeContainer>
            <OrderModeText>Order Mode</OrderModeText>
            <RadioContainer>
              <InputContainer>
                <Label htmlFor="pickup">Pickup</Label>
                <RadioInput
                  id="pickup"
                  type="radio"
                  value="pickup"
                  name="mode"
                />
              </InputContainer>
              <InputContainer>
                <Label htmlFor="delivery">Delivery</Label>
                <RadioInput
                  id="delivery"
                  checked
                  type="radio"
                  value="delivery"
                  name="mode"
                />
              </InputContainer>
            </RadioContainer>
          </OrderModeContainer>
          <DeliverToContainer>
            <p>Deliver to</p>
            <DeliveryCountryContainer type="button">
              <Icon>
                <BiChevronRight size={15} />
              </Icon>
              <DeliveryCountryText>Kuwait</DeliveryCountryText>
            </DeliveryCountryContainer>
          </DeliverToContainer>
        </ContentWrapper>
      </Container>
      <StickyContainer>
        <OrderTotalContainer>
          <p>Order Total</p>
          <OrderTotal>2.000 KD</OrderTotal>
        </OrderTotalContainer>
        <DeliveryCostContainer>
          <p>Delivery Cost</p>
          <DeliveryCost>2.000 KD</DeliveryCost>
        </DeliveryCostContainer>
        <hr />
        <OrderSubtotalContainer>
          <p>Order Subtotal</p>
          <p>2.000 KD</p>
        </OrderSubtotalContainer>

        <CheckoutButtonContainer>
          <CheckoutButton type="button">Checkout</CheckoutButton>
        </CheckoutButtonContainer>
      </StickyContainer>
    </>
  );
};

export default CheckoutSection;

const Container = styled.div`
  background-color: aliceblue;
  position: relative;
`;

const CouponContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5em;
`;

const CouponInput = styled.input`
  flex: 1;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding: 0.7em;
  min-width: 0;
`;
const SubmitButton = styled.button`
  margin: 0 0.25em;
  padding: 0.7em;
  background-color: ${props => props.theme.mainColor};
  color: #fff;
  border-radius: 5px;
`;
const ContentWrapper = styled.div`
  padding: 0 0.5rem;
`;
const StickyContainer = styled.div`
  padding: 0.25rem 0.5rem;
  background-color: aliceblue;
  position: sticky;
  top: 62px;
  z-index: 3;
  align-self: flex-start;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const OrderModeContainer = styled.div`
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const OrderModeText = styled.h6`
  font-size: large;
`;
const RadioContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  font-weight: 600;
`;
const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Label = styled.label`
  margin: 0 0.25em;
`;
const RadioInput = styled.input`
  margin: 0 0.25em;
`;
const DeliverToContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25em 0;
`;
const DeliveryCountryContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;
const DeliveryCountryText = styled.p`
  margin: 0 0.25rem;
`;
const Icon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OrderTotalContainer = styled.div`
  padding: 0.25em 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const OrderTotal = styled.p`
  font-weight: 600;
`;
const DeliveryCostContainer = styled.div`
  padding: 0.25em 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const DeliveryCost = styled.p`
  font-weight: 600;
`;
const OrderSubtotalContainer = styled.div`
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
`;
const CheckoutButtonContainer = styled.div`
  padding: 0.5rem 0.25rem;
`;
const CheckoutButton = styled.button`
  background-color: ${props => props.theme.mainColor};
  color: #fff;
  padding: 0.7em;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.9em;
  letter-spacing: 1px;
  width: 100%;
  border-radius: 5px;
`;
