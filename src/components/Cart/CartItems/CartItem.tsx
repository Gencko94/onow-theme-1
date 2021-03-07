import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineMinus, AiOutlinePlus, AiFillDelete } from 'react-icons/ai';
import { BsPlus } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Product } from '../../../interfaces/product';
import LazyImage from '../../../utils/LazyImage';

interface Props {
  product: Product;
}
const addons = [
  { name: 'Extra Cheese', price: '0.500 KD' },
  { name: 'Extra Onions', price: '0.750 KD' },
];
const CartItem = ({ product }: Props) => {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState<number>(1);
  const handleSubstractQuantity = () => {
    if (quantity === 1) return;
    setQuantity(prev => prev - 1);
  };
  return (
    <Container>
      <ProductContainer>
        <LazyImage src={product.image} alt={product.name} pb="100%" />
        <Details>
          <ProductName to="/products/cheese-burger">{product.name}</ProductName>
          <Price>{product.price}</Price>
          {addons.map(addon => (
            <>
              <AddonName>{addon.name}</AddonName>
              <AddonPrice>+{addon.price}</AddonPrice>
            </>
          ))}
          {/* <SpecialInstructions>Extra Cheese</SpecialInstructions> */}
        </Details>
      </ProductContainer>
      <QuantityWrapper>
        <QuantityContainer>
          <QuantityButton>
            <AiOutlineMinus size={18} />
          </QuantityButton>
          <QuantityText>1</QuantityText>
          <QuantityButton>
            <AiOutlinePlus size={18} />
          </QuantityButton>
        </QuantityContainer>
        <AiFillDelete size={27} color="#b72b2b" />
      </QuantityWrapper>

      {/* <PricingContainer>
        <QuantityWrapper>
          <QuantityText>{t('quantity')} </QuantityText>
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
      </PricingContainer> */}
    </Container>
  );
};

export default CartItem;

const Container = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0.5rem 0;
`;
const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  gap: 0.5rem;
  padding: 0.5rem 0rem;
`;
const Details = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.4fr;

  align-self: flex-start;
`;
const ProductName = styled(Link)`
  display: block;
  /* font-size: 0.9rem; */
  /* margin-bottom: 0.25rem; */
  color: ${props => props.theme.headingColor};
  font-weight: ${props => props.theme.font.xbold};
`;
const AddonName = styled.p`
  font-size: 0.8rem;
  color: ${props => props.theme.subHeading};
  font-weight: ${props => props.theme.font.semibold};
`;
const AddonPrice = styled.p`
  color: ${props => props.theme.subHeading};
  font-size: 0.8rem;
  font-weight: ${props => props.theme.font.bold};
  display: flex;
  /* align-items: center; */
  justify-content: center;
`;
const Price = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.headingColor};
  font-weight: ${props => props.theme.font.xbold};
  display: flex;
  /* align-items: center; */
  justify-content: center;
`;
const SpecialInstructions = styled.p`
  color: ${props => props.theme.highlightColor};
`;
const PricingContainer = styled.div`
  padding: 0.5em;
  display: flex;
  align-items: center;
`;
const QuantityWrapper = styled.div`
  display: flex;
  padding: 0.25rem 0;
  align-items: center;
  justify-content: space-between;
  /* align-self: flex-start; */
`;
const QuantityText = styled.p`
  font-size: 1rem;
  margin: 0 0.5rem;
  font-weight: ${props => props.theme.font.xbold};
  color: ${props => props.theme.subHeading};
`;
const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  /* margin: 0 0.7rem; */
`;
const Quantity = styled.p`
  margin: 0 0.7rem;
  width: 10px;
  text-align: center;
`;
const QuantityButton = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  padding: 0.15rem;
  display: flex;
  align-items: center;
  /* border: 1px solid #222; */
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
