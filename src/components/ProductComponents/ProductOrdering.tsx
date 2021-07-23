import { SetStateAction } from "react";
import { Dispatch } from "react";
import styled from "styled-components";
import Button from "../reusables/Button";
import FileUploader from "../reusables/FileUploader";
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
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
}

const ProductOrdering = ({
  optionalNotes,
  setOptionalNotes,
  setQuantity,
  loading,
  quantity,
  files,
  setFiles,
}: IProps) => {
  return (
    <div>
      <div>
        <Heading tag="h6" margin="1rem 0">
          Upload your files
        </Heading>
        <FileUploader accept=".png, .jpg, .jpeg" onChange={(files) => {}} />
      </div>
      <div>
        <Placeholder height="28px" ready={!loading}>
          <Heading tag="h6" margin="1rem 0">
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
