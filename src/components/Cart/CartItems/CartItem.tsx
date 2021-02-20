import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Product } from '../../../interfaces/product';
import LazyImage from '../../../utils/LazyImage';

interface Props {
  product: Product;
}

const CartItem = ({ product }: Props) => {
  const [quantity, setQuantity] = useState<number>(1);
  const handleSubstractQuantity = () => {
    if (quantity === 1) return;
    setQuantity(prev => prev - 1);
  };
  return (
    <Container>
      <DetailsContainer>
        <LazyImage src={product.image} alt={product.name} pb="100%" />
        <Details>
          <ProductName to="/products/cheese-burger">{product.name}</ProductName>
          <SpecialInstructions>Extra Cheese</SpecialInstructions>
        </Details>
      </DetailsContainer>
      <PricingContainer>
        <QuantityWrapper>
          <QuantityText>Quantity </QuantityText>
          <QuantityContainer>
            <QuantityButton onClick={handleSubstractQuantity}>
              <AiOutlineMinus size={20} />
            </QuantityButton>
            <Quantity>{quantity}</Quantity>
            <QuantityButton onClick={() => setQuantity(prev => prev + 1)}>
              <AiOutlinePlus size={20} />
            </QuantityButton>
          </QuantityContainer>
        </QuantityWrapper>
        <PriceContainer>
          <p>{product.price}</p>
        </PriceContainer>
        <RemoveButton type="button">
          <AiFillDelete size={20} />
        </RemoveButton>
      </PricingContainer>
    </Container>
  );
};

export default CartItem;

const Container = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  /* padding-bottom: 1em; */
`;
const DetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  gap: 1rem;
  padding: 0.25rem;
`;
const Details = styled.div`
  padding: 0.5rem;
`;
const ProductName = styled(Link)`
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 500;
`;
const SpecialInstructions = styled.p`
  color: ${props => props.theme.secondaryColor};
`;
const PricingContainer = styled.div`
  padding: 0.5em;
  display: flex;
  align-items: center;
`;
const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const QuantityText = styled.p`
  font-size: 1rem;
  color: #57423f;
`;
const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0.7rem;
`;
const Quantity = styled.p`
  margin: 0 0.7rem;
  width: 10px;
  text-align: center;
`;
const QuantityButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PriceContainer = styled.div`
  color: ${props => props.theme.mainColor};
  font-weight: 600;
  font-size: 1.2em;
  margin: 0 1em;
`;
const RemoveButton = styled.button`
  color: ${props => props.theme.mainColor};
  color: #b72b2b;
  padding: 0.5em;
  margin-left: auto;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
`;
