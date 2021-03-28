import { m, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ReactPlaceholder from 'react-placeholder/lib';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Hero from '../components/Home/Hero/Hero';
import HomeProduct from '../components/HomeCategories/HomeProduct';
import Layout from '../layout/Layout';
import { getCategory } from '../utils/queries';
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
const Category = () => {
  const { i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { data: category, isLoading } = useQuery(['category', id], () =>
    getCategory(id)
  );
  return (
    <Layout>
      <Hero />
      <Container
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <ReactPlaceholder
          type="textRow"
          style={{
            width: '60%',
            marginLeft: 'auto',
            marginRight: 'auto',
            height: '32px',
            borderRadius: '6px',
            marginTop: 0,
            marginBottom: '2rem',
          }}
          color="#E0E0E0"
          showLoadingAnimation
          ready={Boolean(category)}
        >
          <Title>{category?.name[i18n.language]}</Title>
        </ReactPlaceholder>
        {isLoading && (
          <ProductsContainer>
            {[0, 1, 2, 3, 4, 5].map(i => (
              <>
                <ReactPlaceholder
                  type="rect"
                  style={{
                    width: '100%',
                    height: '125px',
                    borderRadius: '6px',
                    marginTop: 0,
                  }}
                  color="#E0E0E0"
                  showLoadingAnimation
                  // ready={Boolean(category)}
                  ready={false}
                >
                  <></>
                </ReactPlaceholder>
              </>
            ))}
          </ProductsContainer>
        )}
        <ProductsContainer>
          {category?.products.map(product => (
            <HomeProduct key={product.id} product={product} />
          ))}
        </ProductsContainer>
      </Container>
    </Layout>
  );
};

export default Category;

const Container = styled(m.div)(
  ({ theme: { breakpoints, headingColor, font } }) => `
  margin-top: 58px;
  padding: 1rem;
  
  @media ${breakpoints.md}{
    max-width:960px;
    margin: 0 auto;
    margin-top: 58px;
    
  }
  @media ${breakpoints.lg}{
    max-width:1100px;

  }
  `
);
const Title = styled.h1(
  ({ theme: { breakpoints, headingColor, font } }) => `
  font-size: 1.875rem;
  font-weight:${font.bold};
  line-height: 2.25rem;
  text-align: center;
  margin-bottom: 2rem;
  color:${headingColor};
  @media ${breakpoints.xs} {
      font-size: 1.5rem;
      line-height: 2rem;
    }
  }
`
);
const ProductsContainer = styled.div(
  ({ theme: { breakpoints } }) => `
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  @media ${breakpoints.md}{
    
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  `
);
