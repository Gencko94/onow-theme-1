import { SetStateAction } from "react";
import { Dispatch } from "react";
import styled from "styled-components";
import Button from "../reusables/Button";
import Flex, { FlexWrapper } from "../reusables/Flex";
import Heading from "../reusables/Heading";
import Paragraph from "../reusables/Paragraph";
import Placeholder from "../reusables/Placeholder";
import QuantityButtons from "../reusables/QuantityButtons";
import Textarea from "../reusables/Textarea";

interface IProps {
  optionalNotes: string;
  setOptionalNotes: Dispatch<SetStateAction<string>>;
  loading: boolean;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}

const ProductOrdering = ({
  optionalNotes,
  setOptionalNotes,
  setQuantity,
  loading,
  quantity,
}: IProps) => {
  return (
    <div>
      <div>
        <Placeholder height="28px" ready={!loading}>
          <Heading tag="h6" mb="1rem">
            Optional Notes
          </Heading>
        </Placeholder>
        <Placeholder height="28px" ready={!loading}>
          <Textarea setValue={setOptionalNotes} value={optionalNotes} />
        </Placeholder>
      </div>
      <Flex items="center" justify="space-between" margin="1rem 0">
        <Flex items="center" justify="center" margin="0">
          <Paragraph>Quantity</Paragraph>
          <QuantityContainer>
            <Paragraph>{quantity}</Paragraph>
          </QuantityContainer>
          <QuantityButtons quantity={quantity} setQuantity={setQuantity} />
        </Flex>
        <Button text="Select Order Mode" bg="danger" padding="0.5rem" />
      </Flex>
    </div>
  );
};

export default ProductOrdering;
const QuantityContainer = styled(FlexWrapper)`
  box-shadow: ${(props) => props.theme.shadow};
  background-color: #fff;
  margin: 0 0.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
