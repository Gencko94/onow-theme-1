import styled from 'styled-components';
import { categories } from '../../data/categories';
import HomeCategory from './HomeCategory';

const HomeCategories = () => {
  return (
    <Container>
      <Title>Our Food Categories</Title>
      <CategoriesGrid>
        {categories.map(category => (
          <HomeCategory category={category} />
        ))}
      </CategoriesGrid>
    </Container>
  );
};

export default HomeCategories;

const Container = styled.div`
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
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  gap: 1.5rem;
`;
