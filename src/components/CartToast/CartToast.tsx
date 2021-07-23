import { useContext } from "react";
import styled from "styled-components";
import { ApplicationProvider } from "../../contexts/ApplicationContext";
import Flex from "../reusables/Flex";
import Heading from "../reusables/Heading";

const CartToast = () => {
  const { handleToggleCartModal } = useContext(ApplicationProvider);
  return (
    <Container type="button" onClick={handleToggleCartModal!}>
      <Flex justify="space-between" padding="0.5rem">
        <Heading color="textPrimaryContrast" tag="h5">
          Cart Total : 3.000 KD
        </Heading>
        <Heading color="textPrimaryContrast" tag="h5">
          2 Items
        </Heading>
      </Flex>
    </Container>
  );
};

export default CartToast;

const Container = styled.button`
  position: fixed;
  width: 100%;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 18;
  border-radius: 20px 20px 0 0;
  background-color: ${(props) => props.theme.green};
  color: ${(props) => props.theme.textPrimaryContrast};
  border-top: ${(props) => props.theme.border};
  box-shadow: ${(props) => props.theme.shadow};
`;
