import { useState } from 'react';
import styled from 'styled-components';
import { products } from '../../data/products';
import LazyImage from '../../utils/LazyImage';

const OrderItems = () => {
  const [expand, setExpand] = useState(false);
  return (
    <Box expand={expand}>
      <BoxHead>
        <Title>Order Items ({products.length})</Title>
      </BoxHead>
      <OrderItemsContainer>
        {products.map(product => (
          <OrderItem key={product.slug}>
            <DetailsContainer>
              <LazyImage src={product.image} alt={product.name} pb="100%" />
              <Details>
                <ProductName>{product.name}</ProductName>
                <SpecialInstructions>Extra Cheese</SpecialInstructions>
              </Details>
            </DetailsContainer>
            <PricingContainer>
              <SmallContainer>
                <Paragraph>Qty : </Paragraph>
                <Quantity>2 * {product.price}</Quantity>
              </SmallContainer>
              <SmallContainer>
                <Paragraph bold>Total </Paragraph>
                <Price> {product.price}</Price>
              </SmallContainer>
            </PricingContainer>
          </OrderItem>
        ))}
      </OrderItemsContainer>
      <ExpandButtonContainer onClick={() => setExpand(!expand)}>
        {expand ? 'Hide' : 'Show all'}
      </ExpandButtonContainer>
    </Box>
  );
};

export default OrderItems;
const Box = styled.div<{ expand: boolean }>`
  /* padding: 0.5rem; */
  background-color: #fff;
  border-radius: 12px;
  margin-bottom: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  max-height: ${props => (props.expand ? '1000px' : '265px')};
  overflow: hidden;
  transition: max-height 300ms;
`;
const BoxHead = styled.div`
  padding: 0.5rem;
  position: sticky;
  top: 0;
  z-index: 2;
  background: #fff;
`;
const Title = styled.h5(
  ({ theme: { breakpoints } }) => `
  
  text-align: center;
  margin-bottom: .5rem;
 
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
  font-weight: 500;
`;
const SpecialInstructions = styled.p`
  color: ${props => props.theme.secondaryColor};
  font-size: 0.7rem;
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
  font-weight: ${props => (props.bold ? 500 : 400)};
`;
const Quantity = styled.p`
  margin: 0 0.25rem;
  font-size: 0.8rem;
`;
const Price = styled.p`
  margin: 0 0.25rem;
  font-size: 0.8rem;
  font-weight: 600;
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
