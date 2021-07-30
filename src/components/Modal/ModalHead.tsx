import { GrClose } from "react-icons/gr";
import styled from "styled-components";
import Heading from "../reusables/Heading";

interface IProps {
  /**
   * Specifies the Modal's head title.
   */
  title: string;
  /**
   * Callback function to execute when the close button is pressed.
   */
  closeFunction: () => void;
}

const ModalHead = ({ closeFunction, title }: IProps) => {
  return (
    <Container>
      <Heading weight="bold" tag="h5" color="textPrimary">
        {title}
      </Heading>

      <button className="close" type="button" onClick={() => closeFunction()}>
        <GrClose size={18} />
      </button>
    </Container>
  );
};

export default ModalHead;
const Container = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.accent1};
  border-bottom: ${(props) => props.theme.border};

  .close {
    padding: 0.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.accent2};
    &:hover {
      background-color: ${(props) => props.theme.accent3};
    }
  }
`;
