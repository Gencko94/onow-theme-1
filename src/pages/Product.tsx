import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import styled from 'styled-components';
import useResponsive from '../hooks/useResponsive';
import Layout from '../layout/Layout';
import color from 'color';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useLocation, useParams, useHistory } from 'react-router';
import { addToCart, getProduct } from '../utils/queries';
import ReactPlaceholder from 'react-placeholder';
import Loader from 'react-loader-spinner';
import Hero from '../components/Home/Hero/Hero';
import LazyImage from '../utils/LazyImage';
import { m, Variants } from 'framer-motion';
const containerVariants: Variants = {
  hidden: {
    x: '100%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'tween',
    },
  },
  exit: {
    x: '-100%',
    opacity: 0,
  },
};
const Product = () => {
  const { id } = useParams<{ id: string }>();
  const { isDesktop } = useResponsive();
  const { data: product } = useQuery(['product', id], () => getProduct(id));
  const { mutateAsync: addMutation, isLoading: addLoading } = useMutation(
    addToCart,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cart');
      },
    }
  );
  const history = useHistory();
  const location = useLocation();
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState<number>(1);

  const { t, i18n } = useTranslation();
  const handleSubstractQuantity = () => {
    if (quantity === 1) return;
    setQuantity(prev => prev - 1);
  };
  const handleAddToCart = async () => {
    if (product) {
      try {
        await addMutation({
          // image: product.image,
          // name: product?.name,
          price: product.price,
          quantity,
          slug: product.slug,
        });
        history.push('/cart');
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Layout>
      {/* <MobileHeader title="my-addresses" /> */}
      {isDesktop && <Hero />}
      <Container
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <ContentContainer>
          <ReactPlaceholder
            type="rect"
            style={{
              width: '100%',
              height: '100%',
              minHeight: '236px',
              margin: 0,
              borderRadius: '6px',
            }}
            color="#E0E0E0"
            showLoadingAnimation
            ready={Boolean(product)}
          >
            <ImageContainer>
              <LazyImage
                src={product?.image}
                alt={product?.name[i18n.language]}
                pb="calc(236/368 * 100%)"
              />
              {/* <Image src={product?.image} alt={product?.name} /> */}
            </ImageContainer>
          </ReactPlaceholder>

          {/* content */}
          <div>
            <ReactPlaceholder
              type="rect"
              style={{
                width: '100%',
                height: '40px',
                borderRadius: '5px',
                margin: 0,
                marginBottom: '.5rem',
              }}
              color="#E0E0E0"
              showLoadingAnimation
              ready={Boolean(product)}
            >
              <Name>{product?.name[i18n.language]}</Name>
            </ReactPlaceholder>

            <ReactPlaceholder
              type="text"
              style={{
                width: '100%',
                height: '57px',
                borderRadius: '5px',
                margin: 0,
                marginBottom: '1rem',
              }}
              color="#E0E0E0"
              rows={3}
              showLoadingAnimation
              ready={Boolean(product)}
              // ready={false}
            >
              <Description>{product?.description?.[i18n.language]}</Description>
            </ReactPlaceholder>
            <ReactPlaceholder
              type="rect"
              style={{
                width: '25%',
                height: '28px',
                borderRadius: '5px',
                margin: 0,
                marginBottom: '1rem',
              }}
              color="#E0E0E0"
              showLoadingAnimation
              ready={Boolean(product)}
            >
              <Price>
                {product?.price} {t('kd')}
              </Price>
            </ReactPlaceholder>

            <ReactPlaceholder
              type="rect"
              style={{
                width: '50%',
                height: '28px',
                borderRadius: '5px',
                margin: 0,
                marginBottom: '.5rem',
              }}
              color="#E0E0E0"
              showLoadingAnimation
              ready={Boolean(product)}
            >
              <AdditionalInstructionsTitle>
                {t('additional-requests')}
              </AdditionalInstructionsTitle>
            </ReactPlaceholder>
            <ReactPlaceholder
              type="rect"
              style={{
                width: '100%',
                height: '28px',
                borderRadius: '5px',
                margin: 0,
              }}
              color="#E0E0E0"
              showLoadingAnimation
              ready={Boolean(product)}
            >
              <AdditionalInstructionsText rows={4} />
            </ReactPlaceholder>

            {product && (
              <BuyingOptionsContainer>
                <QuantityWrapper>
                  <QuantityText>{t('quantity')} </QuantityText>
                  <QuantityContainer>
                    <QuantityButton onClick={handleSubstractQuantity}>
                      <AiOutlineMinus size={20} />
                    </QuantityButton>
                    <Quantity>{quantity}</Quantity>
                    <QuantityButton
                      onClick={() => setQuantity(prev => prev + 1)}
                    >
                      <AiOutlinePlus size={20} />
                    </QuantityButton>
                  </QuantityContainer>
                </QuantityWrapper>
                <AddButton onClick={() => handleAddToCart()}>
                  {addLoading ? (
                    <Loader
                      type="ThreeDots"
                      color="#fff"
                      height={20}
                      width={30}
                    />
                  ) : (
                    t('add-to-cart')
                  )}
                </AddButton>
              </BuyingOptionsContainer>
            )}
          </div>
        </ContentContainer>
      </Container>
    </Layout>
  );
};

export default Product;
const Container = styled(m.div)(
  ({ theme: { breakpoints } }) => `
  
  max-width:1100px;
  margin:auto;
  @media ${breakpoints.md}{
  min-height:calc(100vh - 200px);
    
    padding: 0.75rem;
  }
`
);

const ContentContainer = styled.div(
  ({ theme: { breakpoints, btnBorder } }) => `
  display:grid;
  @media ${breakpoints.xs}{
    padding: 0.5rem;
    grid-template-columns:1fr;
    row-gap:1rem;
  }
  @media ${breakpoints.md}{
    padding: 1rem;
    margin-top:4rem;
    grid-template-columns:0.6fr 1fr;
    gap:1rem;
    // border:1px solid ${btnBorder};
    // border-radius:8px;
    
  }
  
`
);
const ImageContainer = styled.div(
  ({ theme: { breakpoints } }) => `
  height: 100%;
  width: 100%;
  
  @media ${breakpoints.md}{
    margin-bottom:0;
    
  }
  `
);
const Image = styled.img`
  max-height: 100%;
  border-radius: 8px;
  width: 100%;
  object-fit: cover;
`;
const Name = styled.h1(
  ({ theme: { breakpoints, headingColor, font } }) => `
  color: ${headingColor};
  font-weight: ${font.xbold};
  font-size: 1rem;
  @media ${breakpoints.xs}{
    
    font-size: 1.5rem;
  }
  @media ${breakpoints.md}{
    font-size: 2rem;
    
  }
  `
);
const Description = styled.p`
  padding: 0.5rem 0;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.subHeading};
  font-weight: ${props => props.theme.font.bold};
`;
const Price = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.green};
  font-weight: 600;
  font-weight: ${props => props.theme.font.xbold};
`;
const AdditionalInstructionsTitle = styled.h6(
  ({ theme: { breakpoints, headingColor, font } }) => `
  color: ${headingColor};
  margin-bottom: 0.5rem;
  font-weight: ${font.bold};
  @media ${breakpoints.xs}{
    
    font-size: 1.1rem;
  }
  @media ${breakpoints.md}{
    font-size: 1.3rem;
    
  }
  `
);
const AdditionalInstructionsText = styled.textarea`
  border-radius: 5px;
  padding: 0.25rem;
  font-size: 0.9rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  background-color: ${props => props.theme.inputColorDark};
`;

const BuyingOptionsContainer = styled.div(
  ({ theme: { breakpoints, btnBorder } }) => `
  display: flex;
  align-items: center;
  @media ${breakpoints.xs}{
    padding: 0.25rem 0 ;
  }
  @media ${breakpoints.md}{
    padding: 0.25rem 0;
    justify-content:center;
  }
`
);
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
  color: ${props => props.theme.headingColor};
`;
const AddButton = styled.button`
  border-radius: 6px;
  background-color: ${props => props.theme.btnPrimaryLight};
  color: ${props => props.theme.btnText};
  padding: 0.5rem;
  font-weight: ${props => props.theme.font.bold};
  flex: 1;
  text-transform: uppercase;
  border: 1px solid ${props => props.theme.btnBorder};
`;
