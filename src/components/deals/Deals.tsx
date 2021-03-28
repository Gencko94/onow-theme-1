import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getDeals } from '../../utils/queries';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
import ReactPlaceholder from 'react-placeholder/lib';
import { useTranslation } from 'react-i18next';
import HomeProduct from '../HomeCategories/HomeProduct';

SwiperCore.use([Navigation]);
const breakpoints = {
  // when window width is >= 320px
  320: {
    slidesPerView: 1.25,
    spaceBetween: 20,
  },
  // when window width is >= 480px
  480: {
    slidesPerView: 2.25,
    spaceBetween: 20,
  },
  // when window width is >= 640px
  640: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  768: {
    slidesPerView: 5,
    spaceBetween: 20,
  },
  1100: {
    slidesPerView: 5.25,
    spaceBetween: 20,
  },
  1440: {
    slidesPerView: 5,
    spaceBetween: 20,
  },
};
const Deals = () => {
  const {
    i18n: { language },
  } = useTranslation();
  const { data: deals, isLoading } = useQuery('deals', getDeals, {
    // enabled: inView,
  });
  return (
    <Container>
      <DealsTitleContainer>
        <DealsTitle>{deals?.title[language]}</DealsTitle>
      </DealsTitleContainer>
      {!deals && (
        <Swiper
          breakpoints={breakpoints}
          freeMode
          // navigation
          spaceBetween={10}
          slidesPerView={1.5}
        >
          {[0, 1, 2, 3, 4, 5, 6].map(i => (
            <>
              <ReactPlaceholder
                key={i}
                type="rect"
                style={{
                  width: '100%',
                  height: '125px',
                  borderRadius: '6px',
                  margin: '0',
                }}
                color="#E0E0E0"
                showLoadingAnimation
                ready={Boolean(deals)}
              >
                <></>
              </ReactPlaceholder>
            </>
          ))}
        </Swiper>
      )}
      {deals && (
        <Swiper
          breakpoints={breakpoints}
          freeMode
          // navigation
          spaceBetween={10}
          slidesPerView={1.5}
        >
          {deals.products.map(product => (
            <SwiperSlide key={product.id}>
              <HomeProduct product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Container>
  );
};

export default Deals;
const Container = styled.div`
  /* border-radius: 15px 3px 15px 3px; */
  /* background: #fff; */
  /* box-shadow: ${props => props.theme.shadow}; */
  overflow: hidden;
  margin: 4rem 0;
  padding: 0.5rem;
`;
const DealsTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;
const DealsTitle = styled.h5(
  ({ theme: { breakpoints, headingColor, font } }) => `
  color:${headingColor};
  font-weight:${font.xbold};
  font-size:1.4rem;
  @media ${breakpoints.md}{
    font-size:1.5rem;
  }
  `
);
