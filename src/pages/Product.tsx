import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import styled from 'styled-components';
import { products } from '../data/products';
import Layout from '../layout/Layout';
import LazyImage from '../utils/LazyImage';

const Product = () => {
  const product = products[0];
  const [quantity, setQuantity] = useState<number>(1);

  const handleSubstractQuantity = () => {
    if (quantity === 1) return;
    setQuantity(prev => prev - 1);
  };
  return (
    <Layout>
      <Container>
        <LazyImage src={product.image} alt={product.name} pb="60%" />

        <ContentContainer>
          <Name>{product.name}</Name>
        </ContentContainer>
        <ContentContainer>
          <Price>{product.price}</Price>
        </ContentContainer>
        <ContentContainer>
          <Description>{product.description}</Description>
        </ContentContainer>
        <ContentContainer>
          <AdditionalInstructionsTitle>
            Additional Instructions
          </AdditionalInstructionsTitle>
          <AdditionalInstructionsText rows={4} />
        </ContentContainer>
        <BuyingOptionsContainer>
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
          <AddButton>Add to cart</AddButton>
        </BuyingOptionsContainer>
      </Container>
    </Layout>
  );
};

export default Product;
const Container = styled.div`
  /* margin-top: 66px; */
`;

const ContentContainer = styled.div`
  padding: 0.25rem 1rem;
`;
const Name = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.mainColor};
`;
const Description = styled.p`
  font-size: 0.8rem;
  color: #57423f;
`;
const Price = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.secondaryColor};
  font-weight: 600;
`;
const AdditionalInstructionsTitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.secondaryColor};
  margin-bottom: 0.5rem;
`;
const AdditionalInstructionsText = styled.textarea`
  border-radius: 5px;
  padding: 0.25rem;
  font-size: 0.9rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const BuyingOptionsContainer = styled.div`
  padding: 0.25rem 1rem;
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
const AddButton = styled.button`
  border-radius: 20px;
  background-color: ${({ theme }) => theme.mainColor};
  color: #fff;
  padding: 0.5rem;
  flex: 1;
  text-transform: uppercase;
`;
