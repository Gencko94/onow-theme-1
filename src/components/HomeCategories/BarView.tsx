import styled from "styled-components";
import { Category } from "../../interfaces/categories";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import HomeProduct from "./HomeProduct";
import Heading from "../reusables/Heading";
import Button from "../reusables/Button";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Grid from "../reusables/Grid";
SwiperCore.use([Navigation]);
interface IProps {
  categories: Category[];
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
    slidesPerView: 5.5,
    spaceBetween: 20,
  },
  768: {
    slidesPerView: 5.25,
    spaceBetween: 20,
  },
  1100: {
    slidesPerView: 7.25,
    spaceBetween: 20,
  },
  1440: {
    slidesPerView: 7.25,
    spaceBetween: 20,
  },
};
const BarView = ({ categories }: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <Container>
      <div className="bar">
        <Swiper
          breakpoints={breakpoints}
          freeMode
          spaceBetween={10}
          slidesPerView={1.5}
          watchSlidesVisibility
        >
          {categories.map((category: any, index) => {
            return (
              <SwiperSlide key={category.id}>
                {({ isActive }) => {
                  return (
                    <Button
                      width="100%"
                      bg={activeIndex === index ? "primary" : "accent2"}
                      onClick={() => setActiveIndex(index)}
                      // className="name"
                      padding="0.5rem"
                      text={category?.name[language]}
                    />
                  );
                }}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <Grid cols="repeat(auto-fit,minmax(250px,1fr))" gap="2rem">
        {categories[activeIndex].products.map((product: any) => (
          <HomeProduct key={product.id} product={product} />
        ))}
      </Grid>
    </Container>
  );
};

export default BarView;
const Container = styled.div(
  ({ theme: { breakpoints, accent1, accent2 } }) => `

.bar {
  margin: 4rem 0
}
`
);
