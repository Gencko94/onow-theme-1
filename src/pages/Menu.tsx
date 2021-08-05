import { useContext } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import HomeCategories from "../components/HomeCategories/HomeCategories";
import { ApplicationProvider } from "../contexts/ApplicationContext";
import { categories } from "../data/categories";
import Layout from "../layout/Layout";

const Menu = () => {
  const { t } = useTranslation();
  const { categories } = useContext(ApplicationProvider);
  return (
    <Container>
      {/* <Title>{t('our-menu')}</Title> */}
      {/* {categories?.map(category => (
          <HomeCategory key={category} id={category} />
        ))} */}
      <HomeCategories />
    </Container>
  );
};

export default Menu;

const Container = styled.div(
  ({ theme: { breakpoints, headingColor } }) => `
  margin-top: 58px;
  padding: 0.5rem;
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
