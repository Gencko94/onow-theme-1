import { useContext } from "react";
import ReactModal from "react-modal";
import { useQuery } from "react-query";
import styled from "styled-components";
import CartItems from "../components/Cart/CartItems/CartItems";
import CheckoutSection from "../components/Cart/CheckoutSection";
import ModalHead from "../components/Modal/ModalHead";
import Button from "../components/reusables/Button";
import Flex from "../components/reusables/Flex";
import Heading from "../components/reusables/Heading";
import { ApplicationProvider } from "../contexts/ApplicationContext";
import { AuthProvider } from "../contexts/AuthContext";
import { getCartItems, getGuestCartItems } from "../utils/queries";
ReactModal.setAppElement("#root");

const CartModal = () => {
  const { cartModalOpen, handleToggleCartModal } =
    useContext(ApplicationProvider);
  const { user } = useContext(AuthProvider);
  const { data: userCart, isLoading: userCartLoading } = useQuery(
    ["cart", user],
    getCartItems,
    {
      enabled: Boolean(user),
    }
  );
  const { data: guestCart, isLoading: guestCartLoading } = useQuery(
    "guest-cart",
    getGuestCartItems,
    {
      enabled: !user,
    }
  );
  return (
    <ReactModal
      isOpen={cartModalOpen!}
      onRequestClose={handleToggleCartModal!}
      closeTimeoutMS={200}
      className="modal cart-modal"
    >
      <Container>
        <ModalHead title="Cart" closeFunction={handleToggleCartModal!} />

        <CartItems
          data={userCart ? userCart.products : guestCart?.products}
          isLoading={userCartLoading || guestCartLoading}
        />
        {/* <CheckoutSection
          isLoading={userCartLoading || guestCartLoading}
          data={userCart ? userCart : guestCart}
        /> */}
        <CartSummary>
          <Flex justify="space-between">
            <Heading tag="h6">Delivery Cost</Heading>
            <Heading tag="h6">5.000 KD</Heading>
          </Flex>
          <Flex justify="space-between" margin="0.5rem 0">
            <Heading tag="h6">Cart Total</Heading>
            <Heading tag="h6">5.000 KD</Heading>
          </Flex>
          <Flex justify="center">
            <Button width="100%" bg="green" text="Checkout" padding="0.5rem" />
          </Flex>
        </CartSummary>
      </Container>
    </ReactModal>
  );
};

export default CartModal;
const Container = styled.div(
  ({ theme: { breakpoints, accent1, shadow } }) => `
padding:0 0.5rem;
width:100%;
height:100%;

background-color: ${accent1};
box-shadow:${shadow};
border-radius:20px 20px 0 0;

min-height:calc(100vh - 50px);

@media ${breakpoints.md}{
  min-height:auto;
  padding:0.5rem 1rem;
  border-radius:0;
  box-shadow:none;
}
`
);
const CartSummary = styled.div(
  ({ theme: { breakpoints, bodyColor, shadow } }) => `
  padding: 1rem;
  border-radius: 6px;
  box-shadow: ${shadow};
  background-color: ${bodyColor};
  margin-bottom:50px;
  @media ${breakpoints.md}{
    margin-bottom:0;
  }
  `
);
