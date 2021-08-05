import styled from "styled-components";
import { Product } from "../../interfaces/product";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import HomeProduct from "./HomeProduct";
import { Category, CATEGORY_WITH_PRODUCTS } from "../../interfaces/categories";
import Flex from "../reusables/Flex";
import Button from "../reusables/Button";
import Heading from "../reusables/Heading";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Grid from "../reusables/Grid";
SwiperCore.use([Navigation]);
interface IProps {
  categories: CATEGORY_WITH_PRODUCTS[];
}
const breakpoints = {
  // when window width is >= 320px
  320: {
    slidesPerView: 1.5,
    spaceBetween: 20,
  },
  // when window width is >= 480px
  480: {
    slidesPerView: 2.5,
    spaceBetween: 20,
  },
  // when window width is >= 640px
  640: {
    slidesPerView: 2.5,
    spaceBetween: 20,
  },
  768: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  1100: {
    slidesPerView: 3.25,
    spaceBetween: 20,
  },
  1440: {
    slidesPerView: 3.25,
    spaceBetween: 20,
  },
};
const ListView = ({ categories }: IProps) => {
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

            <Swiper
              breakpoints={breakpoints}
              freeMode
              // navigation
              spaceBetween={10}
              slidesPerView={1.5}
            >
              {category.products.map((product: any) => (
                <SwiperSlide key={product.id}>
                  <HomeProduct product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        );
      })}
    </Container>
  );
};

export default ListView;
const Container = styled.div(
  ({ theme: { breakpoints } }) => `
.category {
  margin: 1rem 0;
}
`
);
