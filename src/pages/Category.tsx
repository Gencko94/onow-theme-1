import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import CategoryProduct from '../components/Categories/CategoryProduct';
import ProductModal from '../components/Categories/ProductModal/ProductModal';
import Hero from '../components/Home/Hero/Hero';
import { products } from '../data/products';
import { Product } from '../interfaces/product';
import Layout from '../layout/Layout';

const Category = () => {
  const { category } = useParams<{ category: string }>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  return (
    <Layout>
      <Hero />
      <Container>
        <Title>{category}</Title>
        <ProductsContainer>
          {products.map(product => (
            <CategoryProduct
              key={product.slug}
              product={product}
              setSelectedProduct={setSelectedProduct}
              setModalOpen={setModalOpen}
            />
          ))}
        </ProductsContainer>
      </Container>
      <CSSTransition
        in={modalOpen}
        classNames="product-modal"
        timeout={200}
        unmountOnExit
        mountOnEnter
      >
        <ProductModal
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          setModalOpen={setModalOpen}
        />
      </CSSTransition>
    </Layout>
  );
};

export default Category;

const Container = styled.div`
  margin-top: 58px;
  padding: 1rem;
`;
const Title = styled.h1(
  ({ theme: { breakpoints } }) => `
  font-size: 1.875rem; 
  line-height: 2.25rem;
  text-align: center;
  margin-bottom: 2rem;
  color:#5F7999;
  @media ${breakpoints.xs} {
      font-size: 1.5rem;
      line-height: 2rem;
    }
  }
`
);
const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  gap: 1.5rem;
`;
