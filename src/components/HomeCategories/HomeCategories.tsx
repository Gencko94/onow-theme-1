import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { categories } from '../../data/categories';
import HomeCategory from './HomeCategory';

const HomeCategories = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Title>{t('common:our-menu')}</Title>
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
  ({ theme: { breakpoints, headingColor } }) => `
  font-size: 1.875rem; 
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

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  gap: 1.5rem;
`;
