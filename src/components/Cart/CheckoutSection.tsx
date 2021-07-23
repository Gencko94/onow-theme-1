import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiCoupon3Line } from "react-icons/ri";
import ReactPlaceholder from "react-placeholder/lib";

import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { OrderProvider } from "../../contexts/OrderContext";
import { GET_CART_RESPONSE } from "../../interfaces/Cart";
import Button from "../reusables/Button";
import Flex from "../reusables/Flex";
import Grid from "../reusables/Grid";
import Heading from "../reusables/Heading";
import Hr from "../reusables/Hr";
import IconedInput from "../reusables/Inputs/IconedInput";
interface IProps {
  data: GET_CART_RESPONSE | undefined;
  isLoading: boolean;
}

const CheckoutSection = ({ isLoading, data }: IProps) => {
  const { globalOrderMode } = useContext(OrderProvider);

  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation(["checkout"]);
  const history = useHistory();
  return (
    <>
      {!data && (
        <Container>
          <>
            {[0, 1, 2].map((i) => (
              <ReactPlaceholder
                key={i}
                type="textRow"
                style={{
                  width: "100%",
                  height: "27px",
                  borderRadius: "6px",
                  marginTop: 0,
                  margin: "0.8rem 0",
                }}
                color="#E0E0E0"
                showLoadingAnimation
                ready={Boolean(data)}
              >
                <></>
              </ReactPlaceholder>
            ))}
            <ReactPlaceholder
              type="textRow"
              style={{
                width: "100%",
                height: "43px",
                borderRadius: "6px",
                marginTop: "1rem",
              }}
              color="#E0E0E0"
              showLoadingAnimation
              ready={Boolean(data)}
            >
              <></>
            </ReactPlaceholder>
          </>
        </Container>
      )}
      {data && (
        <Container>
          <Heading tag="h6">{t("have-coupon")}?</Heading>
          <Grid cols="1fr 0.3fr" gap="0.5rem" margin="0.5rem 0">
            <IconedInput onChange={(e) => {}} value="" Icon={RiCoupon3Line} />
            <Button
              text="Apply"
              bg="green"
              padding="0.25rem"
              textSize="0.8rem"
            />
          </Grid>
          <Hr m="1" />
          <Flex items="center" justify="space-between">
            <Heading tag="h6">{t("order-total")}</Heading>
            <Heading tag="h6">{data.cart_total}</Heading>
          </Flex>
          <Flex items="center" justify="space-between" margin="0.5rem 0">
            <Heading tag="h6">{t("delivery-cost")}</Heading>
            <Heading tag="h6">{data.delivery_cost}</Heading>
          </Flex>

          <Hr m="0.5" />

          <Flex items="center" justify="space-between" margin="0.5rem 0">
            <Heading tag="h5">{t("subtotal")}</Heading>
            <Heading tag="h5" weight="bold">
              {data.cart_subtotal}
            </Heading>
          </Flex>

          <Button
            width="100%"
            text="Checkout"
            bg="green"
            padding="0.5rem"
            onClick={() => {
              history.push("/checkout");
            }}
          />
        </Container>
      )}
    </>
  );
};

export default CheckoutSection;

const Container = styled.div(
  ({ theme: { breakpoints, accent1, shadow, border } }) => ` 
  padding: 0.5rem;
  border:${border};
  width: 100%;
  border-radius:6px;
  z-index: 3;
  background-color:${accent1};
  align-self: flex-start;
  @media ${breakpoints.xs} {
    
    bottom: 0;
  };
  @media ${breakpoints.md} {
    padding: 1rem;
   
    
    border-radius:6px;
  }
  @media ${breakpoints.lg} {
  
  }
`
);
