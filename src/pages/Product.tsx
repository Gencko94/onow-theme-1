import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import styled from 'styled-components';
import { products } from '../data/products';
import Layout from '../layout/Layout';
import LazyImage from '../utils/LazyImage';
import color from 'color';

const Product = () => {
  const product = products[0];
  const [quantity, setQuantity] = useState<number>(1);
  const { t } = useTranslation();
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
            {t('additional-requests')}
          </AdditionalInstructionsTitle>
          <AdditionalInstructionsText rows={4} />
        </ContentContainer>
        <BuyingOptionsContainer>
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
          <AddButton>{t('add-to-cart')}</AddButton>
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
  color: ${({ theme }) => theme.headingColor};
  font-weight: ${props => props.theme.font.xbold};
`;
const Description = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.subHeading};
  font-weight: ${props => props.theme.font.bold};
`;
const Price = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => color(theme.mainColor).lighten(0.4).toString()};
  font-weight: 600;
  font-weight: ${props => props.theme.font.xbold};
`;
const AdditionalInstructionsTitle = styled.h5`
  /* font-size: 1rem; */
  color: ${({ theme }) => theme.headingColor};
  margin-bottom: 0.5rem;
  font-weight: ${props => props.theme.font.bold};
`;
const AdditionalInstructionsText = styled.textarea`
  border-radius: 5px;
  padding: 0.25rem;
  font-size: 0.9rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  background-color: ${props => props.theme.inputColorDark};
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
  color: ${({ theme }) => theme.subHeading};
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
  color: ${props => props.theme.btnText};
`;
const AddButton = styled.button`
  border-radius: 10px;
  background-color: ${({ theme }) =>
    color(theme.mainColor).lighten(0.4).toString()};
  color: ${props => props.theme.btnText};
  padding: 0.5rem;
  font-weight: ${props => props.theme.font.bold};
  flex: 1;
  text-transform: uppercase;
`;
