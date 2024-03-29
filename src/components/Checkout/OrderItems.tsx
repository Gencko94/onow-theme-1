import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { products } from "../../data/products";
import LazyImage from "../../utils/LazyImage";

const OrderItems = () => {
  const { t, i18n } = useTranslation(["checkout"]);
  const [expand, setExpand] = useState(false);
  return (
    <Box expand={expand}>
      <BoxHead>
        <Title>
          {t("order-items")} ({products.length})
        </Title>
      </BoxHead>
      <OrderItemsContainer>
        {products.map((product: any) => (
          <OrderItem key={product.slug}>
            <DetailsContainer>
              <LazyImage
                src={product.image}
                alt={product.name[i18n.language]}
                pb="100%"
              />
              <Details>
                <ProductName>{product.name[i18n.language]}</ProductName>
                <SpecialInstructions>Extra Cheese</SpecialInstructions>
              </Details>
            </DetailsContainer>
            <PricingContainer>
              <SmallContainer>
                <Paragraph>{t("qty")} : </Paragraph>
                <Quantity>2 * {product.price}</Quantity>
              </SmallContainer>
              <SmallContainer>
                <Paragraph bold>{t("total")} </Paragraph>
                <Price> {product.price}</Price>
              </SmallContainer>
            </PricingContainer>
          </OrderItem>
        ))}
      </OrderItemsContainer>
      <ExpandButtonContainer onClick={() => setExpand(!expand)}>
        {expand ? t("hide") : t("show-all")}
      </ExpandButtonContainer>
    </Box>
  );
};

export default OrderItems;
const Box = styled.div<{ expand: boolean }>`
  background-color: ${(props) => props.theme.overlayColor};
  border-radius: 12px;
  margin-bottom: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  max-height: ${(props) => (props.expand ? "700px" : "265px")};
  overflow: ${(props) => (props.expand ? "auto" : "hidden")};
  transition: max-height 300ms;
`;
const BoxHead = styled.div`
  padding: 0.5rem;
  position: sticky;
  top: 0;
  z-index: 2;
  background: ${(props) => props.theme.btnPrimaryLight};
  color: ${(props) => props.theme.btnText};
`;
const Title = styled.h5(
  ({ theme: { breakpoints } }) => `
  
  text-align: center;
 
 
  @media ${breakpoints.xs} {
     
    }
  }
`
);
const OrderItemsContainer = styled.div`
  /* padding: 0.25rem; */
  position: relative;
`;
const DetailsContainer = styled.div`
  display: grid;
  padding: 0.25rem;
  grid-template-columns: 0.4fr 1fr;
  gap: 1rem;
`;
const OrderItem = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const Details = styled.div`
  padding: 0.5rem;
`;
const ProductName = styled.p`
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
  font-weight: ${(props) => props.theme.font.xbold};
`;
const SpecialInstructions = styled.p`
  color: ${(props) => props.theme.subHeading};
  font-size: 0.8rem;
  font-weight: ${(props) => props.theme.font.bold};
`;
const PricingContainer = styled.div`
  padding: 0.5em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const SmallContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Paragraph = styled.p<{ bold?: boolean }>`
  font-size: 0.9rem;
  font-weight: ${(props) =>
    props.bold ? props.theme.font.xbold : props.theme.font.semibold};
`;
const Quantity = styled.p`
  margin: 0 0.25rem;
  font-size: 0.8rem;
  font-weight: ${(props) => props.theme.font.semibold};
`;
const Price = styled.p`
  margin: 0 0.25rem;
  font-size: 1rem;
  font-weight: ${(props) => props.theme.font.xbold};
`;

const ExpandButtonContainer = styled.button`
  background: rgba(221, 215, 215, 0.8);
  z-index: 2;
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0.5rem;
  text-align: center;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;
