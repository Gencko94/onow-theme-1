import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Category, CATEGORY_WITH_PRODUCTS } from "../../interfaces/categories";
import { Product } from "../../interfaces/product";
import Button from "../reusables/Button";
import Flex from "../reusables/Flex";
import Grid from "../reusables/Grid";
import Heading from "../reusables/Heading";
import HomeProduct from "./HomeProduct";
interface IProps {
  categories: CATEGORY_WITH_PRODUCTS[];
}
const GridView = ({ categories }: IProps) => {
  const history = useHistory();
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <Container>
      {categories.map((category) => {
        return (
          <div className="category">
            <Flex margin="2rem 0" items="center" justify="space-between">
              <Heading tag="h4" weight="semibold" color="textPrimary">
                {category?.name[language]}
              </Heading>
              <Button
                bg="primary"
                text="See All"
                padding="0.5rem 0.5rem"
                textSize="0.9rem"
                withTransition
                onClick={() => {
                  history.push(`/categories/${category.id}`);
                }}
              />
            </Flex>
            <Grid cols="repeat(auto-fill,minmax(275px,1fr))" gap="2rem">
              {category.products.map((product: any) => (
                <HomeProduct key={product.id} product={product} />
              ))}
            </Grid>
          </div>
        );
      })}
    </Container>
  );
};

export default GridView;
const Container = styled.div(
  ({ theme: { breakpoints } }) => `
.category {
  margin: 1rem 0;
}
`
);
