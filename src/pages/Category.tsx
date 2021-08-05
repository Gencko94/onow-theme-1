import { m, Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import ReactPlaceholder from "react-placeholder/lib";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import HomeProduct from "../components/HomeCategories/HomeProduct";
import Breadcrumbs from "../components/reusables/Breadcrumbs";
import Grid from "../components/reusables/Grid";
import Heading from "../components/reusables/Heading";
import Layout from "../layout/Layout";
import { getCategory } from "../utils/queries";
const containerVariants: Variants = {
  hidden: {
    x: "100%",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "tween",
    },
  },
  exit: {
    x: "-100%",
    opacity: 0,
  },
};
const Category = () => {
  const { i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { data: category, isLoading } = useQuery(
    ["category", id],
    () => getCategory(id),
    { suspense: true }
  );
  return (
    <Container
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Breadcrumbs
        children={[
          { name: { ar: "الفئات", en: "Categories" }, target: "/categories" },
          {
            name: { ar: category!.name["ar"], en: category!.name["en"] },
            target: `/categories/${category!.id}`,
          },
        ]}
      />
      <ReactPlaceholder
        type="textRow"
        style={{
          width: "60%",
          marginLeft: "auto",
          marginRight: "auto",
          height: "32px",
          borderRadius: "6px",
          marginTop: 0,
          marginBottom: "2rem",
        }}
        color="#E0E0E0"
        showLoadingAnimation
        ready={Boolean(category)}
      >
        <Heading tag="h3" weight="bold" margin="2rem 0">
          {category?.name[i18n.language]}
        </Heading>
      </ReactPlaceholder>
      {isLoading && (
        <Grid cols="repeat(auto-fit, minmax(250px, 1fr)" gap="2rem">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <>
              <ReactPlaceholder
                type="rect"
                style={{
                  width: "100%",
                  height: "125px",
                  borderRadius: "6px",
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
        </Grid>
      )}
      <Grid cols="repeat(auto-fit, minmax(250px, 1fr)" gap="2rem">
        {category?.products.map((product) => (
          <HomeProduct key={product.id} product={product} />
        ))}
      </Grid>
    </Container>
  );
};

export default Category;

const Container = styled(m.div)(
  ({ theme: { breakpoints, headingColor, font } }) => `
 
  padding: 1rem;
  
 
  `
);
