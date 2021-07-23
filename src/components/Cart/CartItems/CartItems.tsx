import { useContext } from "react";
import ReactPlaceholder from "react-placeholder";

import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ThemeContext } from "../../../contexts/ThemeContext";
import CartItem from "./CartItem";
import { CART_ITEM } from "../../../interfaces/Cart";
import Grid, { GridWrapper } from "../../reusables/Grid";

interface IProps {
  data: CART_ITEM[] | undefined;
  isLoading: boolean;
}

const CartItems = ({ data, isLoading }: IProps) => {
  const { t } = useTranslation();
  const { mode } = useContext(ThemeContext);
  return (
    <Container mode={mode}>
      {/* {!data && (
          <LoadingGrid>
            {[0, 1, 2].map((i) => (
              <ReactPlaceholder
                key={i}
                type="textRow"
                style={{
                  width: "100%",
                  height: "119px",
                  borderRadius: "6px",
                  marginTop: 0,
                }}
                color="#E0E0E0"
                showLoadingAnimation
                ready={Boolean(data)}
              >
                <></>
              </ReactPlaceholder>
            ))}
          </LoadingGrid>
        )} */}

      <ItemsWrapper>
        <CartItem />
        <CartItem />
        <CartItem />
        {/* <CartItem />
        <CartItem />
        <CartItem /> */}

        {/* {data.map((product) => (
                <CartItem product={product} key={product.id} />
              ))} */}
      </ItemsWrapper>
    </Container>
  );
};

export default CartItems;

const Container = styled.div<{ mode: string | undefined }>(
  ({ theme: { breakpoints, bodyColor }, mode }) => `

  padding: 1rem 0;
  overflow-y:auto;
  // flex:1;
  height:100%;
  min-height:calc(100vh - 310px);
  max-height:calc(100vh - 310px);
  @media ${breakpoints.md}{
    
    margin: 1rem 0 ;
    min-height:calc(100vh - 261px);
    max-height:calc(100vh - 261px);

  }
  `
);

const LoadingGrid = styled.div(
  ({ theme: { breakpoints } }) => `
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
    padding: 0.5rem;
    @media ${breakpoints.md}{
    padding: 0 0.5rem;
    
  }
`
);

const ItemsWrapper = styled.div(
  ({ theme: { breakpoints, shadow } }) => `
  display:grid;
  grid-template-columns:1fr;
  gap:0.5rem;
 
  // 
  `
);
