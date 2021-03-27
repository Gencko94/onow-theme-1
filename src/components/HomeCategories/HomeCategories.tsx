import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import HomeCategory from './HomeCategory';

import 'swiper/swiper-bundle.css';
import { useContext } from 'react';
import { ApplicationProvider } from '../../contexts/ApplicationContext';

const HomeCategories = () => {
  const { t } = useTranslation();
  const { categories } = useContext(ApplicationProvider);

  return (
    <Container>
      <Title>{t('common:our-menu')}</Title>

      {categories?.map(category => (
        <HomeCategory id={category} />
      ))}
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
  padding: 0.5rem;
`;
