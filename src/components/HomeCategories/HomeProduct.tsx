import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Product } from '../../interfaces/product';

interface IProps {
  product: Product;
}

const HomeProduct = ({ product }: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const { t } = useTranslation();
  return (
    <Container>
      <ImageContainer to={`/products/${product.id}`}>
        {product.sale && (
          <DiscountIcon>
            <DiscountText>
              {product.discount}% {t('off')}
            </DiscountText>
          </DiscountIcon>
        )}
        <Image src={product.image} alt={product.name[language]} />
      </ImageContainer>
      <Content>
        <ProductName>{product.name[language]}</ProductName>

        <Description>{product.description?.[language]}</Description>
        <PriceContainer>
          <Price>
            {product.price} {t('kd')}
          </Price>
          {product.sale && (
            <DiscountPrice>
              {product.price} {t('kd')}
            </DiscountPrice>
          )}
        </PriceContainer>
      </Content>
    </Container>
  );
};

export default HomeProduct;

const Container = styled.div``;
const ImageContainer = styled(Link)`
  display: block;
  position: relative;
  overflow: hidden;
  height: 175px;
  border-radius: 6px;
  background: #fff;
`;
const Image = styled.img`
  object-fit: contain;
  object-position: center;
  height: 100%;
  width: 100%;
`;
const Content = styled.div`
  display: block;
  color: ${props => props.theme.headingColor};
  /* background: ${props => props.theme.overlayColor}; */
  padding: 0.25rem;
  /* height: 56px; */
  font-size: 1.1rem;
  font-weight: ${props => props.theme.font.semibold};
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
`;
const ProductName = styled.p(
  ({ theme: { breakpoints, font } }) => `
  font-weight:${font.bold};
  font-size:1.2rem;
  @media ${breakpoints.md}{
    font-size:1.1rem;
  }
  `
);
const Price = styled.p`
  /* text-align: center; */
  font-size: 1.3rem;
  font-weight: ${props => props.theme.font.bold};
  /* margin-bottom: 0.25rem; */
  /* color: ${props => props.theme.subHeading}; */
`;
const DiscountPrice = styled.p(
  ({ theme: { breakpoints, font, subHeading } }) => `
  text-decoration:line-through;
  color:#838383;
  font-size:1rem;
  @media ${breakpoints.md}{
    font-size:1rem;
  }
  `
);
const Description = styled.p(
  ({ theme: { breakpoints, font, subHeading } }) => `
  color:${subHeading};
  font-size:0.7rem;
  font-weight:${font.regular};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin: 0.25rem 0;
  overflow: hidden;
  @media ${breakpoints.md}{
    font-size:0.8rem;
  }
  `
);
const DiscountIcon = styled.div`
  border-radius: 50px;
  padding: 0.25rem 0.5rem;

  background-color: #b72b2b;
  color: #fff;
  position: absolute;
  top: 5px;
  left: 5px;
`;
const DiscountText = styled.p`
  font-size: 0.7rem;
`;

const PriceContainer = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;
`;
