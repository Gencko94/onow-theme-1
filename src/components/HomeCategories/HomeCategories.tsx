import { useTranslation } from "react-i18next";
import styled from "styled-components";

import "swiper/swiper-bundle.css";
import { useContext } from "react";
import { ApplicationProvider } from "../../contexts/ApplicationContext";
import { useQuery } from "react-query";
import { getCategories } from "../../utils/queries";
import Flex from "../reusables/Flex";
import Button from "../reusables/Button";
import BarView from "./BarView";
import GridView from "./GridView";
import ListView from "./ListView";
import Heading from "../reusables/Heading";
import { categories } from "../../data/categories";

const HomeCategories = () => {
  const { t } = useTranslation();
  const { handleToggleProductsView, productsView } =
    useContext(ApplicationProvider);
  const { data } = useQuery("categories", getCategories, { suspense: true });

  return (
    <Container>
      <Heading tag="h4" color="textPrimary" align="center" weight="bold">
        {t("our-menu")}
      </Heading>
      <Flex margin="3rem 0">
        <Button
          text="List View"
          bg={productsView === "list" ? "blue" : "green"}
          padding="0.25rem"
          onClick={() => {
            handleToggleProductsView?.("list");
          }}
          textSize="0.8rem"
        />
        <Button
          text="Grid View"
          bg={productsView === "grid" ? "blue" : "green"}
          margin="0 0.25rem"
          textSize="0.8rem"
          padding="0.25rem"
          onClick={() => {
            handleToggleProductsView?.("grid");
          }}
        />
        <Button
          text="Bar View"
          bg={productsView === "bar" ? "blue" : "green"}
          margin="0 0.25rem"
          textSize="0.8rem"
          padding="0.25rem"
          onClick={() => {
            handleToggleProductsView?.("bar");
          }}
        />
      </Flex>
      {productsView === "bar" ? (
        <BarView categories={categories as any} />
      ) : productsView === "grid" ? (
        <GridView categories={categories as any} />
      ) : productsView === "list" ? (
        <ListView categories={categories as any} />
      ) : null}
      {/* {data?.map((category) => (
        <HomeCategory key={category.id} category={category} />
      ))} */}
    </Container>
  );
};

export default HomeCategories;

const Container = styled.div`
  padding: 0.5rem;
  margin: 1rem 0;
`;
