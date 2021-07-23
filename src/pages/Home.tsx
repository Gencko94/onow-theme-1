import Layout from "../layout/Layout";
import "../styles.css";
import Hero from "../components/Home/Hero/Hero";
import Introduction from "../components/Home/Introduction/Introduction";
import styled from "styled-components";
import HomeCategories from "../components/HomeCategories/HomeCategories";
import { Suspense, useContext } from "react";
import { ApplicationProvider } from "../contexts/ApplicationContext";
import Deals from "../components/deals/Deals";
import Navbar from "../components/Navbar/Navbar";
import Carousel from "../components/Home/Carousel";
import { FlexWrapper } from "../components/reusables/Flex";
import { categories } from "../data/categories";
import LoadingHome from "../components/LoadingComponents/LoadingHome";
function Home() {
  const { deals, handleToggleProductsView, productsView } =
    useContext(ApplicationProvider);
  return (
    <Suspense fallback={<LoadingHome />}>
      {/* <LoadingHome /> */}
      <Container>
        <Carousel />

        {/* <Categories>
          {categories?.map((category: any) => {
            return <div className="category-item">{category.name.en}</div>;
          })}
        </Categories> */}

        {/* {deals && <Deals />} */}
        <HomeCategories />
      </Container>
    </Suspense>
  );
}

export default Home;

const Container = styled.div``;
const Categories = styled(FlexWrapper)`
  /* background-color: ${(props) => props.theme.accent1}; */
  justify-content: center;
  .category-item {
    padding: 0.75rem 1rem;
    &:hover {
      background-color: ${(props) => props.theme.accent1};
    }
  }
`;
