import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

import styled from "styled-components";
import { GET_CART_RESPONSE } from "../../interfaces/Cart";
interface IProps {}
const CheckoutSummary = ({}: IProps) => {
  const queryCache = useQueryClient();
  const { t } = useTranslation(["checkout"]);
  const data = queryCache.getQueryData<GET_CART_RESPONSE>("guest-cart");
  return (
    <Container>
      <Block>
        <BlockText>{t("order-total")}</BlockText>
        <Number>{data?.cart_total}</Number>
      </Block>
      <Block>
        <BlockText>{t("delivery-cost")}</BlockText>
        <Number>{data?.delivery_cost}</Number>
      </Block>

      <hr />

      <Block>
        <BlockText>{t("subtotal")}</BlockText>
        <Number bold>{data?.cart_subtotal}</Number>
      </Block>

      <CheckoutButtonContainer>
        <CheckoutButton type="submit">{t("go-to-payment")}</CheckoutButton>
      </CheckoutButtonContainer>
    </Container>
  );
};

export default CheckoutSummary;

const Container = styled.div(
  ({ theme: { breakpoints, overlayColor, shadow } }) => `
  position:sticky;
  top:10px;
  margin-top:25px;
  align-self:flex-start;
  width:100%;
  padding:0 1.25rem;
  @media ${breakpoints.md}{
    
    padding:0;
    width:30%;
  }
  
`
);
const ContentContainer = styled.div(
  ({ theme: { breakpoints, overlayColor, seperator, shadow } }) => ` 
  
  padding: 0.5rem 1rem;
  background: ${overlayColor};
  box-shadow:${shadow};
  // width: 400px;
 
  @media ${breakpoints.xs} {
    // bottom: 0;
  };
  @media ${breakpoints.md} {
    border:none;
    border-radius:6px;
  }
  @media ${breakpoints.lg} {
  }
  `
);
const Block = styled.div`
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BlockText = styled.h5(
  ({ theme: { breakpoints, font, subHeading } }) => ` 
  font-weight: ${font.regular};
  color:${subHeading};
  font-size:1.2rem;
  @media ${breakpoints.md}{
    font-size:1.1rem;
  }
`
);
const Number = styled.h5<{ bold?: boolean }>(
  ({ theme: { breakpoints, font, headingColor, subHeading }, bold }) => ` 
  font-weight: ${bold ? font.xbold : font.bold};
  // color:${bold ? headingColor : subHeading};
  font-size:${bold ? "1.2rem" : "1.1rem"};
  @media ${breakpoints.md}{
    font-size:1.1rem;
  }
`
);

const CheckoutButtonContainer = styled.div`
  padding: 0.5rem 0 0.25rem 0;
`;
const CheckoutButton = styled.button`
  background-color: ${(props) => props.theme.green};
  color: ${(props) => props.theme.btnText};
  border: ${(props) => `1px solid ${props.theme.btnBorder}`};
  padding: 0.7em;
  font-weight: ${(props) => props.theme.font.semibold};
  /* text-transform: uppercase; */
  font-size: 1rem;
  letter-spacing: 1px;
  width: 100%;
  border-radius: 5px;
`;
