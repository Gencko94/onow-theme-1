import styled from "styled-components";

import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
const Carousel = () => {
  return (
    <Container>
      <Swiper
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true, dynamicBullets: true }}
        id="main"
        spaceBetween={0}
      >
        <SwiperSlide>
          <div>
            <img src="/images/image1.jpg" alt="something" />
          </div>
        </SwiperSlide>
      </Swiper>
    </Container>
  );
};

export default Carousel;
const Container = styled.div``;
