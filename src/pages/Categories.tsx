import styled from 'styled-components';
import Hero from '../components/Home/Hero/Hero';
import HomeCategory from '../components/HomeCategories/HomeCategory';
import { categories } from '../data/categories';
import Layout from '../layout/Layout';

const Categories = () => {
  return (
    <Layout>
      <Hero />
      <Container>
        <Title>Our Food Categories</Title>
        <CategoriesGrid>
          {categories.map(category => (
            <HomeCategory category={category} />
          ))}
        </CategoriesGrid>
      </Container>
    </Layout>
  );
};

export default Categories;

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

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 1.5rem;
`;
