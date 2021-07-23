import styled from "styled-components";
import Paragraph from "../reusables/Paragraph";

interface IProps {
  active: number;
}

const CartStepper = () => {
  return (
    <Container>
      <div className="item">
        <div className="step">1</div>
        <Paragraph fontSize="0.9rem">Cart</Paragraph>
      </div>
      <span className="seperator" />
      <div className="item">
        <div className="step">2</div>
        <Paragraph fontSize="0.9rem">Address & Payment</Paragraph>
      </div>
      <span className="seperator" />
      <div className="item">
        <div className="step">3</div>
        <Paragraph fontSize="0.9rem">Order Complete</Paragraph>
      </div>
    </Container>
  );
};

export default CartStepper;
const Container = styled.div(
  ({ theme: { shadow, border } }) => `
    display: flex;
    margin:1rem 0 ;
    // background-color:#fff;
    // padding:0.5rem;
    align-items: center;
    .item {
        display: flex;
        flex-direction:column;
        align-items: center;
        justify-items:center;
        .step {
            box-shadow:${shadow};
            border-radius: 50%;
            width: 40px;
            height: 40px;
            padding: 8px 8px;
            background-color:#fff;
            text-align:center;
            margin-bottom:0.5rem;
        }
        
    }
    .seperator {
        border-top:${border};
        flex:1;
        margin: 0 1rem;
    }
    `
);
