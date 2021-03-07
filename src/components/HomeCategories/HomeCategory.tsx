import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeContext, ThemeMode } from '../../contexts/ThemeContext';
import { Category } from '../../interfaces/categories';
import LazyImage from '../../utils/LazyImage';
import { useTranslation } from 'react-i18next';

interface Props {
  category: Category;
}

const HomeCategory = ({ category }: Props) => {
  const {
    i18n: { language },
  } = useTranslation();
  const { mode } = useContext(ThemeContext);
  return (
    <Container>
      <ImageContainer mode={mode} to={`/categories/${category.slug}`}>
        <LazyImage
          src={category.image}
          alt={category.title[language]}
          pb="100%"
        />
      </ImageContainer>
      <NameContainer mode={mode} to={`/categories/${category.slug}`}>
        <CategoryName>{category.title[language]}</CategoryName>
      </NameContainer>
    </Container>
  );
};

export default HomeCategory;

const Container = styled.div``;
const ImageContainer = styled(Link)<{ mode?: ThemeMode }>`
  display: block;
  /* border-radius: 10px; */
  overflow: hidden;

  border-radius: 10px;
  background: #e0e0e0;

  box-shadow: ${props => props.mode === 'light' && props.theme.shadow};
`;
const NameContainer = styled(Link)<{ mode?: ThemeMode }>`
  box-shadow: ${props => props.mode === 'light' && props.theme.shadow};
  background-color: ${props =>
    props.mode === 'light' ? props.theme.mainColor : props.theme.accentColor};
  display: block;
  color: #eee;
  padding: 0.25rem;
  min-height: 48px;
  margin-top: 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CategoryName = styled.p`
  text-align: center;
`;
