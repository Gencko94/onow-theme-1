import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeContext, ThemeMode } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { useQuery } from 'react-query';
import { getCategory } from '../../utils/queries';
import { useInView } from 'react-intersection-observer';
import HomeProduct from './HomeProduct';
import ReactPlaceholder from 'react-placeholder/lib';
SwiperCore.use([Navigation]);
interface Props {
  id: number;
}
const breakpoints = {
  // when window width is >= 320px
  320: {
    slidesPerView: 1.5,
    spaceBetween: 20,
  },
  // when window width is >= 480px
  480: {
    slidesPerView: 3,
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
    slidesPerView: 4.25,
    spaceBetween: 20,
  },
  1440: {
    slidesPerView: 5,
    spaceBetween: 20,
  },
};
const HomeCategory = ({ id }: Props) => {
  const { inView, ref } = useInView({});
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { data: category, isLoading } = useQuery(
    ['category', id],
    () => getCategory(id),
    {
      // enabled: inView,
    }
  );
  const { mode } = useContext(ThemeContext);
  return (
    <Container ref={ref}>
      <CategoryNameContainer>
        <CategoryName>{category?.name[language]}</CategoryName>
        <SeeAll to={`/categories/${category?.id}`}>{t('see-all')}</SeeAll>
      </CategoryNameContainer>
      {!category && (
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
                ready={Boolean(category)}
              >
                <></>
              </ReactPlaceholder>
            </>
          ))}
        </Swiper>
      )}
      {category && (
        <Swiper
          breakpoints={breakpoints}
          freeMode
          // navigation
          spaceBetween={10}
          slidesPerView={1.5}
        >
          {category.products.map(product => (
            <SwiperSlide key={product.id}>
              <HomeProduct product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Container>
  );
};

export default HomeCategory;

const Container = styled.div`
  /* border-radius: 15px 3px 15px 3px; */
  /* background: #fff; */
  /* box-shadow: ${props => props.theme.shadow}; */
  overflow: hidden;
  margin: 4rem 0;
`;
const CategoryNameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;
const SeeAll = styled(Link)(
  ({
    theme: { breakpoints, btnPrimaryLight, btnText, btnBorder, highlightColor },
  }) => `
  background-color: ${btnPrimaryLight};
  color:${btnText};
  padding:0.5rem;
  border-radius:6px;
  font-size:0.9rem;
  transition: background-color 150ms ease;
  border:${btnBorder};
  &:hover {
    background-color:${highlightColor};
  }
  `
);
const CategoryName = styled.h5(
  ({ theme: { breakpoints, headingColor, font } }) => `
  color:${headingColor};
  font-weight:${font.bold};
  font-size:1.4rem;
  @media ${breakpoints.md}{
    font-size:1.5rem;
  }
  `
);
