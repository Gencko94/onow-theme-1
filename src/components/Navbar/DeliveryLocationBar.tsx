import { FaMotorcycle } from "react-icons/fa";
import styled from "styled-components";
import { FlexWrapper } from "../reusables/Flex";
import Paragraph from "../reusables/Paragraph";

const DeliveryLocationBar = () => {
  return (
    <Container>
      <FaMotorcycle size={20} />
      <Paragraph margin="0 0.5rem" fontSize="0.9rem">
        Select Delivery Destination
      </Paragraph>
    </Container>
  );
};

export default DeliveryLocationBar;
const Container = styled(FlexWrapper)(
  ({ theme: { accent1 } }) => `
  padding: 0.5rem;
  background-color: ${accent1};
  cursor: pointer;
  flex: 1;
  border-radius: 6px;
  `
);
