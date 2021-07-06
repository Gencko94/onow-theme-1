import { SetStateAction } from "react";
import { Dispatch } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import styled from "styled-components";

interface IProps {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}

const QuantityButtons = ({ quantity, setQuantity }: IProps) => {
  const increment = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrement = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };
  return (
    <Container>
      <button onClick={increment} type="button" className="icon">
        <FiChevronUp size={25} />
      </button>

      <button onClick={decrement} type="button" className="icon">
        <FiChevronDown size={25} />
      </button>
    </Container>
  );
};

export default QuantityButtons;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: color 100ms ease;
    color: ${(props) => props.theme.textSecondary};
    &:hover {
      color: ${(props) => props.theme.textPrimary};
    }
  }
`;
